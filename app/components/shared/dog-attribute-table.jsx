'use client'

import React from 'react'
import _ from 'lodash'
import { motion } from "framer-motion";
import { containerMotion } from "@/function/framer-animation";
// motion
import { fadeInFromLeft } from '@/function/framer-animation'

export function DogAttributeTable({ fields }) {
  return (
    <div className="prose">
      <motion.table 
        className="mt-6 text-base"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerMotion}
      >
        <tbody>
          <motion.tr
            variants={fadeInFromLeft}
          >
            <td className="font-semibold">Sire</td>
            <td>{_.get(fields, 'sire')}</td>
          </motion.tr>
          <motion.tr
            variants={fadeInFromLeft}
          >
            <td className="font-semibold">Dam</td>
            <td>{_.get(fields, 'dam')}</td>
          </motion.tr>
          <motion.tr
            variants={fadeInFromLeft}
          >
            <td className="font-semibold">Height</td>
            <td>{_.get(fields, 'height')}</td>
          </motion.tr>
          <motion.tr
            variants={fadeInFromLeft}
          >
            <td className="font-semibold">Weight</td>
            <td>{_.get(fields, 'weight')}</td>
          </motion.tr>
          <motion.tr
            variants={fadeInFromLeft}
          >
            <td className="font-semibold">Color</td>
            <td>{_.get(fields, 'color')}</td>
          </motion.tr>
        </tbody>
      </motion.table>
    </div>
  )
}
