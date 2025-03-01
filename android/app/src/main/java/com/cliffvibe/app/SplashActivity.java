package com.cliffvibe.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    private static final int SPLASH_DURATION = 1000; // 1 seconds total

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

        // Get views
        ImageView splashIcon = findViewById(R.id.splash_icon);
        
        // Load animations
        Animation fallIn = AnimationUtils.loadAnimation(this, R.anim.fall_in);
        Animation randomFloat = AnimationUtils.loadAnimation(this, R.anim.random_float);

        // Start speed line animations after a slight delay
        new Handler().postDelayed(this::startSpeedLines, 400);
        
        // Start fall-in animation
        fallIn.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationEnd(Animation animation) {
                // Start floating animation after fall-in
                splashIcon.startAnimation(randomFloat);
            }
            
            @Override
            public void onAnimationStart(Animation animation) {}
            
            @Override
            public void onAnimationRepeat(Animation animation) {}
        });
        
        splashIcon.startAnimation(fallIn);

        // Start main activity after duration
        new Handler().postDelayed(() -> {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
        }, SPLASH_DURATION);
    }

    private void startSpeedLines() {
        for (int i = 1; i <= 4; i++) {
            ImageView line = findViewById(getResources().getIdentifier(
                "speed_line_" + i, "id", getPackageName()));
                
            Animation speedAnim = AnimationUtils.loadAnimation(
                this, 
                getResources().getIdentifier(
                    "speed_line_" + i, "anim", getPackageName()));
                    
            line.startAnimation(speedAnim);
        }
    }
}
