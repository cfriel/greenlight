package com.greenlight.bootstrap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.RandomAccessFile;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.CountDownLatch;

public class Bootstrap {

    public static void close(String[] args) 
    {
    }

    public static void main(String[] args) 
    {
        System.setProperty("gl.logger.prefix", "");
        final String pidFile = System.getProperty("gl.pidfile", System.getProperty("gl-pidfile"));
    }
}
