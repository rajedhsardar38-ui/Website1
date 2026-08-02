package com.flappynature.game;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.LoadAdError;

public class MainActivity extends AppCompatActivity {

    // ===== TEST IDs (Google's official sample IDs) — safe for development =====
    // Replace with your REAL AdMob IDs (from admob.google.com) before publishing.
    private static final String BANNER_AD_UNIT_ID = "ca-app-pub-3940256099942544/6300978111";
    private static final String INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3940256099942544/1033173712"; // Google test interstitial ID

    private WebView webView;
    private AdView adView;
    private InterstitialAd interstitialAd;
    private int levelsSinceAd = 0;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Init AdMob SDK
        MobileAds.initialize(this, initializationStatus -> {});

        // Banner ad
        adView = findViewById(R.id.adView);
        adView.loadAd(new AdRequest.Builder().build());

        // Preload interstitial
        loadInterstitial();

        // WebView setup
        webView = findViewById(R.id.gameWebView);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true); // needed for localStorage used by the game
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.addJavascriptInterface(new AndroidAdsBridge(), "AndroidAds");
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void loadInterstitial() {
        InterstitialAd.load(this, INTERSTITIAL_AD_UNIT_ID, new AdRequest.Builder().build(),
                new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(InterstitialAd ad) {
                        interstitialAd = ad;
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        interstitialAd = null;
                    }
                });
    }

    private void showInterstitialIfReady() {
        if (interstitialAd != null) {
            interstitialAd.show(MainActivity.this);
            interstitialAd = null;
            loadInterstitial(); // preload the next one
        }
    }

    /** Bridge exposed to the game's JavaScript as window.AndroidAds */
    public class AndroidAdsBridge {

        @JavascriptInterface
        public void onGameStart() {
            // no-op for now, hook available if needed later
        }

        @JavascriptInterface
        public void onGameOver() {
            // Show an interstitial occasionally on crash, not every single time
            runOnUiThread(() -> showInterstitialIfReady());
        }

        @JavascriptInterface
        public void onLevelComplete() {
            levelsSinceAd++;
            // Show interstitial every 3 levels completed, so it isn't too intrusive
            if (levelsSinceAd >= 3) {
                levelsSinceAd = 0;
                runOnUiThread(() -> showInterstitialIfReady());
            }
        }
    }

    @Override
    protected void onDestroy() {
        if (adView != null) adView.destroy();
        super.onDestroy();
    }

    @Override
    protected void onPause() {
        if (adView != null) adView.pause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        if (adView != null) adView.resume();
        super.onResume();
    }
}
