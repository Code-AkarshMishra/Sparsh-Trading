# Sparsh Trading - Media Folders

Yahan aap apni photos aur videos dal sakte hain:

1. `modular-kitchen/` -> Modular kitchen ki photos (.jpg, .png) aur videos (.mp4)
2. `upvc-windows-doors/` -> uPVC windows aur doors ki photos/videos
3. `steel-fabrication/` -> Steel gates, grills, frames ki photos/videos
4. `toughened-glass-railing/` -> Glass railings, staircase balustrades ki photos/videos
5. `aluminium-windows/` -> Aluminium sliding windows ki photos/videos
6. `ppgi-steel-door-window-frames/` -> PPGI chaukhat aur window frames ki photos/videos
7. `interior-decor/` -> Metal interior decor aur partition ki photos/videos

In files ko website par dikhane ke liye:
`lib/mediaData.ts` file me bas image ya video ka path add kar dein (jaise: `url: "/media/modular-kitchen/kitchen-photo-1.jpg"`).
Vo automatically service page aur Category-wise Gallery dono jagah show hogi!

## Owner photo

Place the owner's portrait at `owner/owner-photo.jpg`. The About page will show it in the owner message section.

## Bulk upload

For 30-40 assets, sign in as an admin and open `/admin/content`. Choose `Gallery`, select up to 50 JPG, PNG, WebP, MP4, WebM, or MOV files, enter the project category, and publish. Individual files can still be kept in the folders above and added to `lib/mediaData.ts` when they need their own title and description.
