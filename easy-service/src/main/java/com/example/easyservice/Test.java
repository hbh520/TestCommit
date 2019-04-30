package com.example.easyservice;

public class Test {
    public static byte FastScaleByteByByte(byte a, byte b)
    {
        int r1 = a * b + 0x80;
        int r2 = ((r1 >> 8) + r1) >> 8;
        System.out.println(r2);
        return (byte)r2;
    }

    public static void main(String[] args) {
        FastScaleByteByByte((byte)0x12,(byte)0x13);
    }

}
