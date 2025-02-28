package com.cliffvibe.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    private static final int SPLASH_DURATION = 2000; // 2 seconds

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_screen);

        // Make app fullscreen including cutout area
        getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        
        // Hide system bars
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_FULLSCREEN |
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );

        // Start speed line animations
        startSpeedLineAnimation(R.id.speed_line_1, R.anim.speed_line_1);
        startSpeedLineAnimation(R.id.speed_line_2, R.anim.speed_line_2);
        startSpeedLineAnimation(R.id.speed_line_3, R.anim.speed_line_3);

        // Animate the icon with fade and random float
        ImageView splashIcon = findViewById(R.id.splash_icon);
        
        // Initial fade in
        AlphaAnimation fadeIn = new AlphaAnimation(0f, 1f);
        fadeIn.setDuration(400);
        
        // Random floating movement
        Animation randomFloat = AnimationUtils.loadAnimation(this, R.anim.random_float);
        
        splashIcon.startAnimation(fadeIn);
        // Start random float after fade in
        fadeIn.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationEnd(Animation animation) {
                splashIcon.startAnimation(randomFloat);
            }
            
            @Override
            public void onAnimationStart(Animation animation) {}
            
            @Override
            public void onAnimationRepeat(Animation animation) {}
        });

        // Start main activity after delay
        new Handler().postDelayed(() -> {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
        }, SPLASH_DURATION);
    }

    private void startSpeedLineAnimation(int viewId, int animationId) {
        ImageView line = findViewById(viewId);
        Animation animation = AnimationUtils.loadAnimation(this, animationId);
        line.startAnimation(animation);
    }
}
