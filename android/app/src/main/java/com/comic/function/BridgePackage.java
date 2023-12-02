package com.comic.function;

import androidx.annotation.NonNull;
import com.comic.function.Home.HomeFunction;
import com.comic.function.login.LoginFunction;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BridgePackage implements ReactPackage {
    @NonNull
    @NotNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull @NotNull ReactApplicationContext reactApplicationContext) {
        ArrayList<NativeModule> list = new ArrayList<>();
        list.add(new LoginFunction(reactApplicationContext));
        list.add(new HomeFunction(reactApplicationContext));
        return list;
    }

    @NonNull
    @NotNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull @NotNull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
