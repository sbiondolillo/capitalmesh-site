---
title: "What is the Mesh?"
---

The mesh is a community-powered communication system that uses inexpensive [**LoRa**](https://en.wikipedia.org/wiki/LoRa) radios to connect people without relying on cell towers or internet access.

Several open-source applications can run on this LoRa-based mesh — but [**Meshtastic**](https://meshtastic.org/) currently has the widest adoption and most active community, making it the easiest way to get started.

It’s designed for off-grid messaging, emergency preparedness, outdoor adventures, and community resilience. By forming a decentralized mesh network, devices relay messages across multiple nodes — extending coverage far beyond the range of a single device.

Whether you're hiking in remote areas, preparing for natural disasters, or building local networks for community empowerment, the mesh offers a flexible and privacy-respecting way to stay connected.

## 🧠 How It Works: From Spectrum to Mesh

The mesh builds on a stack of technologies that make long-range, low-power communication possible — even in places where traditional networks fail.

### 📡 RF Spectrum

All wireless communication happens over the [**radio frequency (RF) spectrum**](https://en.wikipedia.org/wiki/Radio_spectrum), a range of electromagnetic waves used for everything from AM/FM radio to Wi-Fi and satellite links. Different parts of the spectrum are regulated and allocated for specific uses — some require licenses, others are open to the public, like the **ISM bands** used by LoRa.

| Band / Service             | Frequency Range         | Notes                                   |
|----------------------------|-------------------------|-----------------------------------------|
| AM Broadcast Radio         | ~530 kHz – 1.7 MHz      | Licensed; long-range groundwave         |
| FM Broadcast Radio         | ~88 MHz – 108 MHz       | Licensed; high-fidelity audio           |
| VHF/UHF Broadcast TV       | ~54 MHz – 806 MHz       | Legacy TV; some repurposed for LTE      |
|**ISM Band (915 MHz)**      | **902 MHz – 928 MHz**   | **Unlicensed; used for LoRa in U.S.**   |
| ISM Band (2.4 GHz)         | ~2.40 GHz – 2.48 GHz    | Unlicensed; global Wi-Fi and IoT        |
| Wi-Fi (5 GHz)              | 5.15 GHz – 5.85 GHz     | Unlicensed; Partially overlaps ISM      |
| ISM Band (5.8 GHz)         | 5.725 GHz – 5.875 GHz   | Unlicensed; Often used for outdoor links|
| Cellular (varies)          | ~700 MHz – 2.6 GHz      | Licensed; varies by carrier             |
| Satellite Communications   | 10 GHz and above        | Licensed; high-frequency uplinks        |


### 🔍 ISM Bands

Mesh protocols like Meshtastic operate in the [**Industrial, Scientific, and Medical (ISM) bands**](https://en.wikipedia.org/wiki/ISM_radio_band), which are unlicensed portions of the RF spectrum. These bands are globally available for low-power devices, making them ideal for community-driven communication. In the U.S., Meshtastic typically uses the ISM band centered on 915 MHz; in Europe, it’s 868 MHz.

These bands are shared — meaning devices must comply with power and duty cycle limits to avoid interference. That’s where LoRa comes in.

### 📶 LoRa: Long Range, Low Power

[**LoRa**](https://en.wikipedia.org/wiki/LoRa) (short for Long Range) is a wireless modulation technique that enables communication over miles with minimal power. It’s not fast — you won’t stream video over LoRa — but it’s incredibly efficient for short messages, sensor data, and location updates.

LoRa’s strength lies in its ability to punch through obstacles and cover long distances, even in noisy environments. It’s perfect for rural areas, forests, mountains, or dense urban zones where traditional signals struggle.

At the heart of LoRa is [**Chirp Spread Spectrum (CSS)**](https://en.wikipedia.org/wiki/Chirp_spread_spectrum) — a modulation method where signals sweep across a range of frequencies (called chirps) to encode data. Think of chirps like sonar pings — sweeping signals that carry data by changing frequency over time. CSS is highly resistant to interference and enables reliable communication at low signal-to-noise ratios. This is what allows LoRa devices to maintain long-range links using minimal power, even in crowded or obstructed environments.

Want to learn more about Chirp Spread Spectrum? [Read the deep dive →](/blog/chirp-spread-spectrum/)

### 🔗 Meshtastic: A Popular Mesh Implementation

[**Meshtastic**](https://meshtastic.org/) takes LoRa and adds a mesh networking layer on top. Instead of each device talking directly to a central hub, nodes relay messages to each other — hopping across the network until the message reaches its destination.

This means:
- No single point of failure  
- No need for internet or cell towers  
- Coverage grows as more people join

Meshtastic doesn’t replace LoRa — it builds on it, adding routing, encryption, and message handling to create a full mesh experience. Devices can be handheld, solar-powered, or integrated into fixed installations. They’re affordable, customizable, and designed to empower local communication — whether you're off-grid or just building something resilient.

> _Note: While Meshtastic is currently the most widely used mesh protocol for LoRa devices, other projects such as [Meshcore](https://meshcore.co.uk/) and [Reticulum](https://reticulum.network/) offer alternative approaches tailored to different use cases. We welcome experimentation and curiousity as the mesh ecosystem continues to evolve._

---

## 🚀 Ready to Join the Mesh?

If the idea of resilient, community-powered communication resonates with you, we’d love to have you onboard.

Visit our [**Join page**](../join/) to get started — whether you're setting up your first device, exploring coverage, or just curious about how it all works.
