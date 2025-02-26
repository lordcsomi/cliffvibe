#!/bin/bash

# Colors for console output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print step with emoji and color
print_step() {
    echo -e "${BLUE}$1${NC} $2"
}

# Error handling
handle_error() {
    echo -e "\033[0;31m❌ Error: $1${NC}"
    exit 1
}

# Check if Android directory exists
if [ ! -d "android" ]; then
    handle_error "Android project not found. Please run 'pnpm exec cap add android' first."
fi

# Build Next.js app
print_step "📦" "Building Next.js app..."
pnpm build || handle_error "Next.js build failed"

# Sync with Capacitor
print_step "🔄" "Syncing with Capacitor..."
pnpm exec cap sync android || handle_error "Capacitor sync failed"

# Create build directory if it doesn't exist
mkdir -p build

if [ "$1" == "--install" ]; then
    # Check if a device is connected
    adb devices | grep -q "device$" || handle_error "No device connected. Please connect an Android device."
    
    # Build and install on connected device
    print_step "📱" "Building and installing on device..."
    cd android && ./gradlew installDebug || handle_error "Gradle build failed"
    
    print_step "✅" "App installed successfully on device!"
else
    # Just build the APK
    print_step "📱" "Building APK..."
    cd android && ./gradlew assembleDebug || handle_error "Gradle build failed"
    
    # Move APK to build directory
    cp app/build/outputs/apk/debug/app-debug.apk ../build/cliffvibe.apk || handle_error "Failed to copy APK"
    
    print_step "✅" "Build complete! APK available at: build/cliffvibe.apk"
fi
