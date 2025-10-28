---
title: "How Do I Join?"
---

Want to help build a stronger, more connected Capital Region?


## Getting Started Is Easy

### 1️⃣ Set Up Your Node

Join the mesh with a Meshtastic-compatible LoRa device. This guide assumes you're using the Meshtastic mobile app with a node that comes pre-flashed. For custom setups or flashing instructions, visit the official [getting started guide](https://meshtastic.org/docs/getting-started/).  

- 🛒 Get a node: any compatible device works—[recommended models](/blog/recommended-devices) make setup easier
- 📱 Install the Meshtastic app on your phone:  
<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; margin-bottom: 1rem;">

  <a href="https://apps.apple.com/us/app/meshtastic/id1586432531" target="_blank" rel="noopener" style="flex: 1 1 200px; text-decoration: none; border: 1px solid #ccc; border-radius: 8px; padding: 1rem; display: flex; align-items: center; gap: 1rem;">
    {{< ico bootstrap apple >}}
    <div>
      <strong>Download on the App Store</strong><br>
      iOS (iPhone, iPad)
    </div>
  </a>

  <a href="https://play.google.com/store/apps/details?id=com.geeksville.mesh&hl=en-US" target="_blank" rel="noopener" style="flex: 1 1 200px; text-decoration: none; border: 1px solid #ccc; border-radius: 8px; padding: 1rem; display: flex; align-items: center; gap: 1rem;">
    {{< ico bootstrap google-play >}}
    <div>
      <strong>Get it on Google Play</strong><br>
      Android phones and tablets
    </div>
  </a>

</div>

- 🔗 Pair your node to your phone: follow the manufacturer's pairing instructions and that’s it—you’re ready to send your first message

### 2️⃣ Add Channels

To participate in Capital Region Mesh, we recommend a dual-channel setup that balances local coordination with broader interoperability.  

{{< qr text="https://meshtastic.org/e/?add=true#CgMSAQEKIRIQY2FwaXRhbG1lc2gubmV0IRoLQ2FwaXRhbE1lc2g6ABIMCAE4AUAFSAFQHmgB" />}}

Scan the QR code above or [click to open in Meshtastic](https://meshtastic.org/e/?add=true#CgMSAQEKIRIQY2FwaXRhbG1lc2gubmV0IRoLQ2FwaXRhbE1lc2g6ABIMCAE4AUAFSAFQHmgB) to add both channels automatically!  

#### {{< ico bootstrap gear-fill >}} Manual Channel Setup

<details>
<summary>Click to view manual configuration settings</summary>

<div style="max-width: 300px; margin: 1em 0; padding: 1em; border-radius: 8px; border: 1px solid #ccc">

**Channel Name**
```plaintext
CapitalMesh
```

**PSK (Pre-Shared Key)**
```plaintext
Y2FwaXRhbG1lc2gubmV0IQ==
```
</div>
</details>

---

#### 🌐 Channel 0 – `LongFast` *(Primary)*

The default public channel used by Meshtastic devices worldwide. Messages are unencrypted and visible to all.

- Allows passive listening and long-range relaying  
- Maintains interoperability with other public nodes  
- Useful when traveling or operating in other regions with active mesh networks

---

#### 🔐 Channel 1 - `CapitalMesh` *(Secondary)*

Our main coordination channel for local mesh activity. Messages are encrypted using a shared key unique to this channel.

- Prioritizes local traffic: text, telemetry, and location updates  
- Enables secure communication and community resilience  
- Ideal for coordination, testing, and knowledge sharing

---

This setup offers a simple, secure way to join the mesh and start contributing. For infrastructure nodes, kit builds, and long-term outdoor deployments, stay tuned for a future post.

### 3️⃣ Next Steps

Once you're connected, you can:

- 🧭 Listen to local traffic and learn how messages flow  
- 🤝 Connect with nearby users and help map the network  
- 🛠️ Visit [the Contribute page](/contribute) to find ways to support, build, and shape the mesh

---

## ⏰ Coming Soon

- Step-by-step setup guides  
- Collaboration tools and contribution pathways

## 📬 Stay in the Loop

Want updates, guides, and community news delivered directly?

<form action="https://buttondown.email/api/emails/embed-subscribe/capitalmesh" method="post" target="popupwindow" onsubmit="window.open('https://buttondown.email/capitalmesh', 'popupwindow')">
<fieldset style="border: none; padding: 0; margin: 0;">
<legend style="font-weight: bold; margin-bottom: 0.5em;">Subscribe to our newsletter and be the first to hear about new tools, local activity, and ways to contribute.</legend>

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

Prefer direct contact? Email us at [info@capitalmesh.net](mailto:info@capitalmesh.net).
