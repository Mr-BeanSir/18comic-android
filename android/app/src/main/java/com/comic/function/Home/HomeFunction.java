package com.comic.function.Home;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import org.jetbrains.annotations.NotNull;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

public class HomeFunction extends ReactContextBaseJavaModule {
    @NotNull
    @Override
    public String getName() {
        return "HomeFunction";
    }

    public HomeFunction(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void getPageSource(String urlC, String cookie, Promise promise) {
        new Thread(() -> {
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
                    promise.resolve(response.toString());
                }
                promise.reject("fail");
            }catch (Exception e) {
                promise.reject(e);
            }
        }).start();
    }
}
