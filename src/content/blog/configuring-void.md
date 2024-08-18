---
'title': 'How I configure my Void Linux install'
'description': "What workarounds/other stuff I did to make Void 'usable'"
pubDate: 'August 17 2024'
heroImage:
  src: '/configure-void.png'
  alt: 'i believe in void supremacy!!'
tags: ["linux", "void linux", "tech", "tutorial"]
series: "linux"
---

# Void, again.
Well,, i've recently installed void linux on my actual main pc now, and honestly, it's been a great experience so far. However, I did have to do some workarounds for certain things to work, so, I decided to make this blog post on how i configure Void Linux to my likings.

## What we'll go through:
- Install Void Linux using BTRFS
- Install sway
- Install linux-tkg
- Profit?

## Step 1. Installing Void Linux
Probably the easiest part, but some beginners might struggle with it.
- Go to [Void Linux's website](https://voidlinux.org/)
- Download the musl or glibc version (see the differences [here](#difference-between-glibc-and-musl))
- Flash the void iso using balena etcher, rufus, ventoy or dd
- Boot into the usb
- Login as "root" with the password "voidlinux"
- Run "void-installer"
- Go through the setup until you reach mirrors. DO NOT SELECT BRAZILIAN MIRRORS! THEY ARE BROKEN. I'd recommend choosing the nearest to you, but I used the global repo.
- Go through the setup again until you reach partitioning. This is the hard part.

## Partitioning
You can either use fdisk or cfdisk, I don't really care. But your partition structure should look like this:

- Create a 1G partition with the type <mark>"EFI System"</mark>
- Create the rest of the unallocated space with the type <mark>"Linux filesystem"</mark>
- Write changes and then once it reaches the part of creating the filesystems:
  - Format your 1G partition as vfat, mount point in /boot/efi
  - Format the other partition as BTRFS, mount point in /
- Simply continue the void install.

## Sway Install
Now that you've succesfully (hopefully) installed void, here's how to change from a boring old TTY to a tiling window manager

- Run `sudo xbps-install -Syu` to update the system. This is important, as if you don't do this, you won't be able to install any packages.
- Install the following packages:
`sudo xbps-install -S sway seatd polkit xorg-minimal xf86-video-{YOUR_GPU_HERE} xorg-fonts dbus foot`
- After this, enable the required services:
`ln -s /etc/sv/polkitd /var/service`
`ln -s /etc/sv/dbus /var/service`
`ln -s /etc/sv/seatd /var/service`
- Then, run `usermod -aG _seatd {YOUR_USERNAME}` and reboot your pc.
- After the reboot, simply run `sway` on the terminal!
You now have a very minimal sway install on Void Linux.

## Installing linux-tkg (optional)
You could just use Void from just following these 2 steps, but if you wanna experiment with a custom kernel, here's how I did it:

- Install the following packages:
`sudo xbps-install base-devel gcc binutils make ncurses-devel bison flex openssl-devel elfutils-devel u-boot-tools python3 bc lz4 parahole git`
- Git clone into [linux-tkg repository](https://github.com/Frogging-Family/linux-tkg)
- CD into linux-tkg folder and run `chmod +x install.sh
IMPORTANT!!!!! PLEASE OPEN `customization.cfg` WITH A TEXT EDITOR AND SET _configfile="running-kernel"
- Run ./install.sh install and select Generic install. Simply follow the steps and wait until it errors out on dracut.
- To fix the dracut error, follow these steps
  - CD into the `/boot` directory
  - Rename the "vmlinuz" file to "vmlinuz-{KERNEL-VERSION}-tkg-{CPU_SCHEDULER}"
  - Run `sudo dracut --force --hostonly --lz4 --kver {VMLINUZ_NAME}
  - Run `sudo update-grub`
  - Reboot your pc.
  - That's it!

# Conclusion
Void linux is a really easy distribution to configure, you just gotta get used to the manual intervention you gotta do to some apps for them to work. I hope this "guide" helped you do sommething on Void Linux succesfully.


### Difference between glibc and musl {#difference-between-glibc-and-musl}

#### glibc
glibc is a simple and vastly supported libc that's used by most distros. however, it tends to be insecure and clunky. but, if you're gonna use nvidia drivers, then you need glibc.

#### musl
musl is an even simpler but not so supported libc that's used by alpine and others. it's faster than glibc and more secure, but LOTS of software isn't supported with it, and you'll have to rely on flatpaks, distroboxes or [a glibc chroot](https://docs.voidlinux.org/config/containers-and-vms/chroot.html)
