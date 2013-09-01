#!/bin/sh

GL_CLASSPATH=$GL_CLASSPATH:$GL_HOME/lib/greenlight.jar:$GL_HOME/lib/*

if [ "x$GL_MIN_MEM" = "x" ]; then
    GL_MIN_MEM=256m
fi
if [ "x$GL_MAX_MEM" = "x" ]; then
    GL_MAX_MEM=1g
fi
if [ "x$GL_HEAP_SIZE" != "x" ]; then
    GL_MIN_MEM=$GL_HEAP_SIZE
    GL_MAX_MEM=$GL_HEAP_SIZE
fi

# min and max heap sizes should be set to the same value to avoid
# stop-the-world GC pauses during resize, and so that we can lock the
# heap in memory on startup to prevent any of it from being swapped
# out.
JAVA_OPTS="$JAVA_OPTS -Xms${GL_MIN_MEM}"
JAVA_OPTS="$JAVA_OPTS -Xmx${GL_MAX_MEM}"

# new generation
if [ "x$GL_HEAP_NEWSIZE" != "x" ]; then
    JAVA_OPTS="$JAVA_OPTS -Xmn${GL_HEAP_NEWSIZE}"
fi

# max direct memory
if [ "x$GL_DIRECT_SIZE" != "x" ]; then
    JAVA_OPTS="$JAVA_OPTS -XX:MaxDirectMemorySize=${GL_DIRECT_SIZE}"
fi

# reduce the per-thread stack size
JAVA_OPTS="$JAVA_OPTS -Xss256k"

# set to headless, just in case
JAVA_OPTS="$JAVA_OPTS -Djava.awt.headless=true"

# Force the JVM to use IPv4 stack
if [ "x$GL_USE_IPV4" != "x" ]; then
  JAVA_OPTS="$JAVA_OPTS -Djava.net.preferIPv4Stack=true"
fi

JAVA_OPTS="$JAVA_OPTS -XX:+UseParNewGC"
JAVA_OPTS="$JAVA_OPTS -XX:+UseConcMarkSweepGC"

JAVA_OPTS="$JAVA_OPTS -XX:CMSInitiatingOccupancyFraction=75"
JAVA_OPTS="$JAVA_OPTS -XX:+UseCMSInitiatingOccupancyOnly"

# When running under Java 7
# JAVA_OPTS="$JAVA_OPTS -XX:+UseCondCardMark"

# GC logging options
if [ "x$GL_USE_GC_LOGGING" != "x" ]; then
  JAVA_OPTS="$JAVA_OPTS -XX:+PrintGCDetails"
  JAVA_OPTS="$JAVA_OPTS -XX:+PrintGCTimeStamps"
  JAVA_OPTS="$JAVA_OPTS -XX:+PrintClassHistogram"
  JAVA_OPTS="$JAVA_OPTS -XX:+PrintTenuringDistribution"
  JAVA_OPTS="$JAVA_OPTS -XX:+PrintGCApplicationStoppedTime"
  JAVA_OPTS="$JAVA_OPTS -Xloggc:/var/log/elasticsearch/gc.log"
fi

# Causes the JVM to dump its heap on OutOfMemory.
JAVA_OPTS="$JAVA_OPTS -XX:+HeapDumpOnOutOfMemoryError"
