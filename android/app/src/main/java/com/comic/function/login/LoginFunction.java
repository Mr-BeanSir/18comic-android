package com.comic.function.login;

import com.facebook.react.bridge.*;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.TestOnly;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

public class LoginFunction extends ReactContextBaseJavaModule {

    public LoginFunction(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NotNull
    @Override
    public String getName() {
        return "LoginFunction";
    }

    @ReactMethod
    public void getCookie(String urlC, String data, Promise promise) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL(urlC);
                    HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
                    connection.setRequestMethod("POST");
                    connection.setInstanceFollowRedirects(false);
                    connection.setDoOutput(true);
                    connection.setConnectTimeout(5000);
                    try(OutputStream os = connection.getOutputStream()) {
                        os.write(data.getBytes());
                    }
                    int responseCode = connection.getResponseCode();
                    if (responseCode == HttpsURLConnection.HTTP_MOVED_PERM) {
                        List<String> headers =  connection.getHeaderFields().get("Set-Cookie");
                        StringBuilder ck = new StringBuilder();
                        for (String header : headers) {
                            String[] split = header.split(";");
                            if (split.length > 1) {
                                ck.append(split[0]);
                                ck.append(";");
                            }
                        }
                        promise.resolve(ck.toString());
                    }
                    promise.resolve("");
                }catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void testLogin(String urlC, String cookie,Promise promise) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL(urlC);
                    HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setRequestProperty("Cookie", cookie);
                    connection.setConnectTimeout(5000);
                    int responseCode = connection.getResponseCode();
                    if (responseCode == HttpsURLConnection.HTTP_OK) {
                        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        StringBuilder response = new StringBuilder();
                        String line;
                        while ((line = reader.readLine()) != null) {
                            response.append(line);
                        }
                        boolean containsProfile = response.toString().contains("Profile");
                        if (containsProfile) {
                            promise.resolve("success");
                        }else{
                            promise.reject("fail");
                        }
                    }
                    promise.reject("fail");
                }catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }
}
