---
title: "June 2026 Meetup Recap"
date: 2026-06-10
tags:
  - community
  - organization
  - Reticulum
  - LoRa
  - events
  - charter
description: "A recap of the June 2026 Capital Region Mesh meetup — featuring Adam's introduction to Reticulum, the unanimous adoption of CRM's founding charter, and the launch of an exploratory Reticulum working group."
summary: "A focused evening with a lot to show for it: CRM adopted its founding charter by unanimous consent, dove deep into Reticulum, and launched a new working group."
draft: false
---

# 🛰️ June Recap: Reticulum, a Founding Charter, and New Working Groups

**📅 Wednesday, June 3, 2026**
**📍 The Parlor @ Unitarian Universalist Church, Concord**

June's meetup was a smaller, focused gathering — and a consequential one. The group adopted CRM's organizational charter, got a thorough introduction to Reticulum, and ended the evening with two new working groups taking shape.

---

## 📡 Reticulum: The Networking Stack Without Borders

*Presented by Adam*

Adam opened the evening with a deep dive into **Reticulum**, a hardware-agnostic networking stack built around the idea that the network layer shouldn't care what's underneath it. Whether you're running LoRa, WiFi, Serial, or something else entirely, Reticulum treats it all the same.

A few things make Reticulum stand out from the protocols CRM has explored before:

- **Every node has a cryptographic identity.** Addressing is derived directly from public keys — there's no traditional source address, no central registry, no authority that can revoke your address.
- **All traffic is encrypted end-to-end**, by default, at the protocol level.
- **Store-and-forward is built in.** Messages can be held and relayed by intermediate nodes, making delivery possible even when the path isn't continuously available.

For apps, Adam highlighted two options depending on how you want to use it. **Sideband** is the original client, written in Python and well-suited for desktop and tinkering. **Columba** is a native Android app that can run Reticulum in the background — making it practical for mobile use without keeping a terminal open.

The honest caveat: while flashing firmware to a node is straightforward, the overall barrier to entry is still higher than Meshtastic or MeshCore. But interest in the room was high enough that the group decided to do something about it — more on that below.

---

## 🗳️ Members' Council: A Charter Adopted

Ken led the Members' Council through what turned out to be a landmark agenda item: a final review of the organizational charter Sam introduced in May.

After working through the remaining questions — how the concentric-circle membership model works in practice, how consensus decisions get made, and what "the open-source approach to a group" actually looks like — **the attendees adopted the [charter](/docs/crm-charter.pdf) by unanimous consent and joined as CRM's founding members.**

It's a real milestone. CRM now has a formal structure, a recognized membership, and a shared framework for how we make decisions together.

A few other items from the Council:

- **CRM has a PO Box and a signed lease** for the space at the UU Church — both in the organization's name.
- **Sam and Becky will be at the Epic Skill Swap** this weekend to talk about mesh radio.
- The **LoRa Working Group** is eyeing a Wilmot → Kearsarge link as a next coverage target.
- **Alex proposed setting a CRM region code** inside deployed nodes for consistent identification.
- **Ken created a CRM QR code** for nodes deployed on public land — Becky offered to laminate them. (More on why that matters in the Working Session section.)
- **Alex volunteered to explore a Matrix server** as a replacement for the several Signal chats currently in use by the group.

---

## 🛠️ Working Session: Nodes, Networks, and a New Working Group

The working session picked up where the Community Assembly left off: more Reticulum. A couple of attendees got onboarded hands-on, which helped the group move from general interest to a concrete next step — **an exploratory Reticulum working group** will spin up to dig further into the technology and figure out what a CRM deployment could look like.

The group also talked through node identification for infrastructure deployed on public land. An attendee shared that nodes placed on fire towers around the state — by others in the broader mesh community, not CRM specifically — have been confiscated by the NH state forestry division. In cases where nodes had identifying information attached, that contact info gave owners a path toward recovering their equipment. Ken's QR code is CRM's proactive response: a simple, durable way to identify our nodes in the field and give anyone who encounters them a way to reach us, should we ever find ourselves in a similar situation.

Build materials for the next generation of CRM nodes were also on the table, with more detail expected as the July meeting takes shape.

---

## 🌱 Looking Ahead

July's meetup will be a hands-on **node building party**. Alex is bringing the parts and pieces to build several of his **Rattlesnake nodes** — his own open-source design — with the group. Others are welcome to bring their own designs to show off. These Rattlesnake nodes will be the next wave of CRM infrastructure, custom-printed with CRM branding and destined for regional deployment.

[**July 2026 Meetup →**]({{< relref "july-meetup" >}})

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
