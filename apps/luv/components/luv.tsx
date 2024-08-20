'use client'

import { useState, useEffect } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { ModeToggle } from './theme-button'

interface UpcomingDay {
  label: string
  value: number
}

export function Luv(): JSX.Element {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [partner1Name, setPartner1Name] = useState<string>('')
  const [partner1Birthday, setPartner1Birthday] = useState<Date>(new Date())
  const [partner2Name, setPartner2Name] = useState<string>('')
  const [partner2Birthday, setPartner2Birthday] = useState<Date>(new Date())
  const [daysCounter, setDaysCounter] = useState<number>(0)
  const [anniversary, setAnniversary] = useState<Date>(new Date())
  const [showInfo, setShowInfo] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysCounter((prevDays) => prevDays + 1)
    }, 86400000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getDaysSince = (): number => {
    const diffInDays = Math.floor(
      (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    return diffInDays
  }

  const isUpcomingBirthday = (birthday: Date): boolean => {
    const today = new Date()
    const birthdayThisYear = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate()
    )
    return (
      birthdayThisYear > today &&
      birthdayThisYear <
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
    )
  }

  const isUpcomingAnniversary = (): boolean => {
    const today = new Date()
    const anniversaryThisYear = new Date(
      today.getFullYear(),
      anniversary.getMonth(),
      anniversary.getDate()
    )
    return (
      anniversaryThisYear > today &&
      anniversaryThisYear <
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
    )
  }

  const getUpcomingDays = (): UpcomingDay[] => {
    const today = new Date()
    const partner1BirthdayThisYear = new Date(
      today.getFullYear(),
      partner1Birthday.getMonth(),
      partner1Birthday.getDate()
    )
    const partner2BirthdayThisYear = new Date(
      today.getFullYear(),
      partner2Birthday.getMonth(),
      partner2Birthday.getDate()
    )
    const anniversaryThisYear = new Date(
      today.getFullYear(),
      anniversary.getMonth(),
      anniversary.getDate()
    )
    const next100thDay = Math.ceil(getDaysSince() / 100) * 100
    const upcomingDays: UpcomingDay[] = [
      { label: 'Current D+ Date', value: getDaysSince() },
      {
        label: `D day until ${partner1Name ? partner1Name + "'s" : 'Partner 1'} Birthday`,
        value: Math.ceil(
          (partner1BirthdayThisYear.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      },
      {
        label: `D day until ${partner2Name ? partner2Name + "'s" : 'Partner 2'} Birthday`,
        value: Math.ceil(
          (partner2BirthdayThisYear.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      },
      {
        label: 'D day until next Anniversary',
        value: Math.ceil(
          (anniversaryThisYear.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      },
      {
        label: `D day until next 100th (${next100thDay})`,
        value: next100thDay - getDaysSince(),
      },
    ]
    return upcomingDays.sort((a, b) => a.value - b.value)
  }

  const copyStateToClipboard = (): void => {
    const state = {
      startDate: startDate.toISOString(),
      partner1Name,
      partner1Birthday: partner1Birthday.toISOString(),
      partner2Name,
      partner2Birthday: partner2Birthday.toISOString(),
      anniversary: anniversary.toISOString(),
    }
    const url = `${window.location.origin}${window.location.pathname}?state=${encodeURIComponent(
      JSON.stringify(state)
    )}`
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <div className="text-foreground bg-background w-full max-w-md rounded-lg p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Date Counter for Lovers
        </h1>
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="mb-1 block text-sm font-medium"
            >
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  {formatDate(startDate)}
                  <div className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => setStartDate(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label
              htmlFor="partner1Birthday"
              className="mb-1 block text-sm font-medium"
            >
              Partner 1 Birthday
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  {formatDate(partner1Birthday)}
                  <div className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={partner1Birthday}
                  onSelect={(date) => setPartner1Birthday(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label
              htmlFor="partner1Name"
              className="mb-1 block text-sm font-medium"
            >
              Partner 1 Name (Optional)
            </label>
            <Input
              id="partner1Name"
              type="text"
              value={partner1Name}
              onChange={(e) => setPartner1Name(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="partner2Birthday"
              className="mb-1 block text-sm font-medium"
            >
              Partner 2 Birthday
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  {formatDate(partner2Birthday)}
                  <div className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={partner2Birthday}
                  onSelect={(date) => setPartner2Birthday(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label
              htmlFor="partner2Name"
              className="mb-1 block text-sm font-medium"
            >
              Partner 2 Name (Optional)
            </label>
            <Input
              id="partner2Name"
              type="text"
              value={partner2Name}
              onChange={(e) => setPartner2Name(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={copyStateToClipboard}>
              Copy State
            </Button>
          </div>
        </div>
        {showInfo && (
          <div className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Upcoming Dates</h2>
            <ul>
              {getUpcomingDays().map((day, index) => (
                <li key={index} className="mb-2 flex justify-between">
                  <span>{day.label}</span>
                  <span className="font-semibold">{day.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
