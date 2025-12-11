---
title: "December 2025 Meetup Recap"
date: 2025-12-06
tags: ["community", "organization", "devices", "events"]
description: A recap of the December 3rd Capital Region Mesh meetup — regional topology planning, intentional network design, and the launch of our bridge node working groups.
summary: Highlights from our December session, including consensus on a phased rollout strategy and the formation of teams to prototype a custom bridge node enclosure.
draft: false
---

## 🧭 Revisiting Our Foundations

We kicked off the December meetup with a round of introductions — **10 attendees in total, including 6 newcomers**. Once everyone settled in, the meeting began with a concise recap of the [October Kick-Off meeting](/blog/events/2025/kickoff-recap/) to bring new participants up to speed on the goals of **Capital Region Mesh** and the lessons that shaped our early direction.

From there, the group shifted into a deeper discussion about the risks of a naïve build‑out; exploring a potential failure state in which an uncoordinated deployment fails to deliver on the promise of **reliable, resilient messaging**. The takeaway was clear: if we don’t invest some time in careful design up-front, we risk undermining both the network's performance and the trust we’re trying to build in the region.

---

## 🗺️ Intentional Network Design — Exploring Our Options

With that framing in place, we examined three possible paths for building a robust regional mesh:

### 1. **Reform Meshtastic**
- **Pros:** Leverages existing infrastructure, taps into the platform’s popularity, and benefits from the large online community (particularly the [NH Mesh Discord](https://discord.com/invite/8Axh3rdgDD)).  
- **Cons:** Current app stability issues, significant reconfiguration effort for remote routers, and the risk of wasting effort forcing a square peg into a round hole.

### 2. **Move to MeshCore**
- **Pros:** A protocol more aligned with our long‑term goals, while still allowing reuse of existing hardware.  
- **Cons:** Smaller community, potentially higher reconfiguration cost, and possible reluctance from Meshtastic users to switch.

### 3. **Custom LoRa‑Based Firmware**
- **Pros:** Full control over protocol behavior and the ability to tailor the system precisely to our needs.  
- **Cons:** Large project scope, ongoing maintenance burden, high conversion cost, and substantial outreach requirements.

After a thoughtful discussion, the group reached a **consensus**: **our initial prototype will be a custom solution built on top of Meshtastic**, using it as a foundation while designing the features and behaviors required for a resilient regional network.

To simplify deployment and ensure broad compatibility across the region, the group agreed that the Backbone will operate on the **default public LongFast configuration**. This gives us a stable, predictable baseline and removes the need for a staged rollout — allowing us to move directly into developing the custom bridge node enclosure.

---

## 🔧 Launching the Bridge Node Working Groups

With this consensus in hand, we shifted into practical planning. Attendees volunteered to form **working groups** focused on the components required to prototype our custom **bridge node enclosure** — based on the concept outlined in the first blog post in our series about [building meshes that actually deliver](/blog/beyond-the-node-map/).

Participants contributed design goals, constraints, and early specifications. These ranged from enclosure durability and mounting considerations to radio isolation, power management, and the logic required for reliable message forwarding.

The full design goals and a breakdown of the distinct roles will be covered in an upcoming post.

---

## 🌐 Community Connections & Next Steps

After a short break, we regrouped to schedule our next meetup and share updates on personal projects, local initiatives, and related groups in the region. Several attendees expressed interest in collaborating across organizations, highlighting the growing ecosystem of mesh‑curious makers and communicators in the Capital Region.

We’ll reconvene in January to review early progress from the working groups and continue refining the regional topology plan. Full details are available on the [January 2026 Meetup page](/blog/events/2026/january-meetup/).

---

<form action="https://buttondown.email/api/emails/embed-subscribe/capitalmesh" method="post" target="popupwindow" onsubmit="window.open('https://buttondown.email/capitalmesh', 'popupwindow')">
<fieldset style="border: none; padding: 0; margin: 0;">
<legend style="font-weight: bold; margin-bottom: 0.5em;">Want updates and event notifications delivered directly to your inbox?</legend>

<input
    type="email"
    name="email"
    id="bd-email"
    placeholder="you@example.com"
    required
    style="width: 100%; padding: 0.5em; border: 1px solid var(--border, #ccc); border-radius: 4px; margin-bottom: 0.05em;">

<input
    type="submit"
    value="Sign me up!"
    style="padding: 0.5em 1em; background-color: #3399ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">

</fieldset>
</form>
