# Project Aura: Product Requirement Document (PRD)
**Version**: 2.0 | **Status**: Confidential | **Design Philosophy**: Human-Centric

---

## 1. Vision
**"Technology for the Heart."**

Project Aura is not just a social platform; it is a digital layer of emotion overlaid upon the physical world. We believe that every location holds a memory, a feeling, or a story waiting to be discovered. Aura uses privacy-preserving location intelligence to connect users with the "spirit" of a place—curated by those they trust and admire.

We do not build "features"; we build **Connections**.

---

## 2. Design Philosophy
As an Apple App Team, our work is guided by three core values:

*   **Intimacy & Privacy**: We treat user location as sacred. All location processing happens on-device where possible. We never track; we only "wake up" when the user is in a moment of discovery.
*   **Fluidity**: The interface should feel like an extension of the physical world. No jarring transitions. Content flows like water.
*   **Invisible Tech**: The technology (Geofencing, AR, Bluetooth) should be invisible. The user feels "Magic," not "Algorithms."

---

## 3. Experience Architecture (Navigation)

We reject the traditional "Tab Bar" if it breaks immersion. However, for clarity and muscle memory, we use a **Translucent Floating Dock** that disappears when scrolling, maximizing content immersion.

### The Dock (Core Tabs)

1.  **Discover (Compass Icon)**
    *   *The Lens to the World.*
    *   A curated feed of "Moments" from Curators (KOLs) and Friends.
    *   **Smart Search**: Integrated with Spotlight. Type "Coffee with a view" and get instant, curated results.
    *   **Scanner**: A subtle, haptic-enabled button to scan Aura Codes at physical locations.

2.  **Connections (People Icon)**
    *   *Your Inner Circle.*
    *   A beautiful, card-based interface showing friends' recent "Echoes" (footprints).
    *   **Privacy Control**: Granular control over who sees your activity. "Ghost Mode" is just a toggle away.

3.  **Me (Memoji/Avatar)**
    *   *Your Digital Memory Box.*
    *   **My Journey**: A privacy-secure map visualization of your unlocked memories.
    *   **Vault**: Where your collected "Time Capsules" and "Moments" are stored.

---

## 4. Core Experiences

### 4.1 Discover: The Serendipity Engine
Instead of a chaotic feed, we present **"Collections"**.
*   **Visuals**: Full-screen, high-fidelity imagery and video.
*   **Haptics**: Subtle vibration when scrolling past a highly-rated Moment.
*   **Spatial Audio**: Background ambience that matches the location (e.g., cafe sounds, nature) when viewing a Moment.

### 4.2 Spatial Identity (The Place View)
When a user arrives at a location or taps a Moment:
*   **Hero Moment**: A cinematic loop of the location.
*   **The Aura Score**: A single, elegant ring indicating the "Vibe" (aggregated sentiment), not just a star rating.
*   **App Clip Integration**: No need to install the full app to view a Moment. Scan an App Clip Code at the venue to unlock the experience instantly.

### 4.3 Moments (The "Easter Egg" System)
Renamed from "Easter Eggs" to **"Moments"**. This is the heart of Aura.

**The Creation Flow (The "Burying" Ritual):**
1.  **Select Location**: Pinpoint with precision.
2.  **Choose Artifact**:
    *   💌 **Time Capsule**: A video message that unlocks only when the recipient is *physically* there.
    *   🕶️ **AR Note**: Write in the air. Your friend sees it through their camera.
    *   ☕ **Gift**: Integration with Apple Pay to leave a coffee for a friend.
3.  **Seal It**: A satisfying animation of "locking" the moment into the physical coordinates.

**The Discovery Flow (The "Unlocking" Ritual):**
*   **Notification**: "You are near a Moment left by [Friend Name]."
*   **Precision Finding**: Use UWB (Ultra Wideband) interface (like AirTag) to guide the user to the exact spot.
*   **Unlock**: A magical burst of haptics and sound as the content is revealed.

### 4.4 Connections (Friends)
*   **The Circle**: Visual representation of close friends.
*   **Sherlock (Smart Suggestions)**: "Sarah was here 2 hours ago. Want to leave her a note?" (On-device intelligence).
*   **Privacy First**:
    *   **Approximate Location**: Option to share only the city or neighborhood, not the exact spot.
    *   **Auto-Delete**: History auto-deletes after 30 days unless saved to "Vault".

---

## 5. Ecosystem Integration
*   **Dynamic Island**: Shows active "Moment Hunting" status or distance to a hidden capsule.
*   **Live Activities**: Real-time distance countdown as you approach a location.
*   **Widgets**: "Memory of the Day" on the Home Screen.
*   **Siri Shortcuts**: "Hey Siri, leave a Moment here."

---

## 6. Privacy & Security (The Apple Standard)
*   **Data Minimization**: We collect only what is needed to unlock the moment.
*   **On-Device Processing**: Friend recommendations and location clustering happen on the Neural Engine, not our servers.
*   **Transparency**: Clear, human-readable explanations of why we need location permissions.

---

## 7. Onboarding
*   **Cinematic Intro**: A 10-second video setting the mood.
*   **Sign in with Apple**: The default and preferred login method. Hide My Email support.
*   **Soft Ask**: We ask for location permissions *only* when the user tries to find a Moment, not at launch.