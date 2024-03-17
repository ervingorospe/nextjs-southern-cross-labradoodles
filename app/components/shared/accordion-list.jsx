'use client'

import React, { useState } from "react";
import { Collapse } from "react-collapse";
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
import { Motion, MotionVariant } from '@/app/layouts';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export function AccordionList({ subCollection }) {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

 
  return (
    <Motion className="mt-6">
      {
        subCollection?.map((item, i) => (
           <MotionVariant
            variants={fadeInFromBottom} 
            key={item.id}
          >
            <div className="py-4 border-b border-b-gray-200">
              <div className="cursor-pointer flex justify-between w-full items-center" onClick={() => handleOpen(i + 1)}>
                <h3 className="font-medium text-xl tracking-wide">{item.name}</h3>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${open === i + 1 ? "rotate-180" : ""} h-5 w-5 transition-transform`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              </div>
              <Collapse isOpened={open === i + 1}>
                <p className="text-lg prose max-w-full mt-4" dangerouslySetInnerHTML={{__html: _.get(item, 'fields.body')}}/>
              </Collapse>
            </div>
          </MotionVariant>
        ))
      }
    </Motion>
  );
}