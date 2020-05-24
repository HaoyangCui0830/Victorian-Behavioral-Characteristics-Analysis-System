package com.ccc.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @description: TODO
 * @author: Xin(Shawn) Wu
 */

@RestController
@RequestMapping("/api")
public class LoadBalanceTestController {

    @GetMapping(value = "/test")
    public String test2() {
        return getLocalIP();
    }

    public static String getLocalIP() {
        InetAddress addr = null;
        try {
            addr = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        byte[] ipAddr = addr.getAddress();
        String ipAddrStr = "";
        for (int i = 0; i < ipAddr.length; i++) {
            if (i > 0) {
                ipAddrStr += ".";
            }
            ipAddrStr += ipAddr[i] & 0xFF;
        }
        System.out.println("/api/test invoked");
        //System.out.println(ipAddrStr);
        return "This response from "+ipAddrStr;
    }
}
