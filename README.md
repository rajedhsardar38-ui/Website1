# Flappy Nature - Android App

## GitHub par upload aur APK build karne ke steps:

1. GitHub par ek naya repository banao (public ya private, dono chalega).
2. Is puri `FlappyNature` folder ka pura content us repo me upload/push kar do
   (saare files aur folders sahit — `.github` folder bhi zaroor jaana chahiye).
3. Upload hote hi **Actions** tab me automatically build shuru ho jayega
   (`.github/workflows/build.yml` ki wajah se).
4. Build complete hone ke baad, us workflow run ke andar **Artifacts** section
   me `FlappyNature-debug-apk` milega — usse download karke APK nikal lena.

## Zaroori baat - AdMob real IDs

Abhi is app me Google ke **TEST AdMob IDs** lagi hui hain (safe hain, koi
dikkat nahi hogi). Play Store par publish karne se pehle in 2 jagah apni
**real AdMob IDs** daalni hongi:

- `app/src/main/AndroidManifest.xml` → `APPLICATION_ID` meta-data
- `app/src/main/java/com/flappynature/game/MainActivity.java` →
  `BANNER_AD_UNIT_ID` aur `INTERSTITIAL_AD_UNIT_ID`

## App details
- Package name: `com.flappynature.game`
- Language: Java + XML
- Game engine: HTML5/Canvas (WebView ke andar chalta hai)
