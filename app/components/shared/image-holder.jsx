'use client'

import React, { useState } from 'react'
import Image from 'next/image'
// contants
import { defaultImageAlt } from '@/lib/constants'
// components
import { ImageModal } from '@/components/shared'

export function ImageHolder({ image, className }) {
  const [open, setOpen] = useState(false)

  if (image) {
    return (
      <div className="cursor-pointer">
        <figure className={className.figure} onClick={() => setOpen(true)}>
          <Image
            src={image.imageUrl}
            alt={image.altText ? image.altText : defaultImageAlt}
            priority={true}
            height={500}
            width={500}
            className={className.image}
          />
        </figure>
        
        {
          image.caption && (
            <figcaption className="mt-2 block text-gray-400 italic">{image.caption}</figcaption>
          )
        }
        
        <ImageModal
          open={open}
          onClose={() => setOpen(false)}
          photo={image}
        />
      </div>
    )
  }
}