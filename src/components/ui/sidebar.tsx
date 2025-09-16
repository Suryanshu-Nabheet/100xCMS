"use client";

import * as React from "react"
import { createContext, useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Local utility: className combiner (kept local to avoid path alias requirements)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ")

// Types
export interface SidebarLinkItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

// Context
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

const useSidebar = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider")
  return ctx
}

// Provider
function SidebarProvider({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) {
  const [openState, setOpenState] = useState(false)
  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Root component (API compatible with your SidebarDemo)
export function Sidebar({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export function SidebarBody(props: React.ComponentProps<"div">) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  )
}

function DesktopSidebar({ className, children, ...props }: React.ComponentProps<typeof motion.nav>) {
  const { open, setOpen, animate } = useSidebar()
  return (
    <motion.nav
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 shrink-0 border-r border-neutral-200/60 dark:border-neutral-700/60 relative z-30",
        className,
      )}
      animate={{ width: animate ? (open ? 300 : 60) : 300 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      aria-label="Primary"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.nav>
  )
}

function MobileSidebar({ className, children, ...props }: React.ComponentProps<"div">) {
  const { open, setOpen } = useSidebar()
  return (
    <div
      className={cn(
        "h-12 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full border-b border-neutral-200/60 dark:border-neutral-700/60 z-40",
      )}
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <button
          className="text-neutral-800 dark:text-neutral-200 p-2 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close sidebar" : "Open sidebar"}
          aria-expanded={open}
          aria-controls="mobile-sidebar-panel"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              id="mobile-sidebar-panel"
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className,
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Sidebar"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SidebarLink({
  link,
  className,
  ...props
}: {
  link: SidebarLinkItem
  className?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { open, animate } = useSidebar()
  return (
    <a
      href={link.href}
      className={cn("flex items-center justify-start gap-2 group/sidebar py-2", className)}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </a>
  )
}
