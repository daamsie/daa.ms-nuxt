---
title: 'Wherdle'
description: "Can you figure out today's mystery place"
logo: 'wherdle.svg'
tech: "Svelte, Typescript, LocalStorage, Lucee, MySQL"
images: 'wherdle.webp,stats.webp'
---

[Wherdle](https://wherdle.travellerspoint.com) is my take on the daily game concept popularised by Wordle. 

In Wherdle you are presented with 5 travel photos of a mystery location. Your job is to guess the mystery place. 

I chose to build this project in Svelte. It uses LocalStorage to keep track of your results and build up stats over time. The photos and daily game are fetched from Travellerspoint. I created a backend to handle picking photos for each location. 