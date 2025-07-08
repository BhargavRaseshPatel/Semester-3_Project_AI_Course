import React from 'react'
import { Button } from '@/components/ui/button'
import { HiMiniExclamationTriangle } from 'react-icons/hi2'

const Upgrade = () => {
  return (
    <div className="h-screen flex w-full items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full shadow-xl flex-col items-center justify-center rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <HiMiniExclamationTriangle className="text-yellow-500 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Upgrade Required</h1>
        <p className="text-gray-600 mb-6">
          You've reached your content generation limit. Upgrade your plan to continue using AI-powered learning tools without interruptions.
        </p>
        <Button className="w-full text-lg py-2">Upgrade Now</Button>
        <p className="text-sm text-gray-400 mt-4">
          Need help? <span className="underline cursor-pointer text-blue-600">Contact support</span>
        </p>
      </div>
    </div>
  )
}

export default Upgrade
