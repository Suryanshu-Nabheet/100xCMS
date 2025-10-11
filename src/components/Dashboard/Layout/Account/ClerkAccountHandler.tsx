'use client'
import React from 'react'
import { UserButton } from '@clerk/clerk-react'

interface ClerkAccountHandlerProps {
  className?: string
}

export const ClerkAccountHandler: React.FC<ClerkAccountHandlerProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <UserButton 
        appearance={{
          baseTheme: undefined,
          elements: {
            // Avatar styling
            avatarBox: "w-8 h-8",
            
            // Popover card styling
            userButtonPopoverCard: "bg-white border border-black/15 shadow-2xl",
            userButtonPopoverCardBox: "bg-white",
            userButtonPopoverCardBoxInner: "bg-white",
            userButtonPopoverCardBoxInnerWrapper: "bg-white",
            userButtonPopoverCardBoxInnerWrapperInner: "bg-white",
            userButtonPopoverCardBoxInnerWrapperInnerInner: "bg-white",
            userButtonPopoverCardBoxInnerWrapperInnerInnerInner: "bg-white",
            
            // Actions styling
            userButtonPopoverActions: "bg-white",
            userButtonPopoverActionButton: "text-black hover:bg-black/10 transition-all duration-200",
            userButtonPopoverActionButtonText: "text-black font-medium",
            userButtonPopoverActionButtonIcon: "text-black",
            
            // Footer styling
            userButtonPopoverFooter: "bg-white border-t border-black/15",
            userButtonPopoverFooterBox: "bg-white",
            userButtonPopoverFooterBoxInner: "bg-white",
            userButtonPopoverFooterBoxInnerWrapper: "bg-white",
            userButtonPopoverFooterBoxInnerWrapperInner: "bg-white",
            userButtonPopoverFooterText: "text-black/70",
            userButtonPopoverFooterAction: "text-black/70",
            userButtonPopoverFooterActionText: "text-black/70",
            
            // Main identifier styling
            userButtonPopoverMainIdentifier: "text-black font-semibold",
            userButtonPopoverSecondaryIdentifier: "text-black/80",
            
            // Avatar elements
            userButtonPopoverAvatar: "bg-white",
            userButtonPopoverAvatarBox: "bg-white",
            userButtonPopoverAvatarImage: "bg-white",
            
            // Header elements
            userButtonPopoverHeader: "bg-white",
            userButtonPopoverHeaderText: "text-black",
            userButtonPopoverHeaderSubtext: "text-black/80",
            
            // Account Management Modal/Sidebar
            accountManagementModal: "bg-white",
            accountManagementSidebar: "bg-white",
            accountManagementSidebarHeader: "bg-white",
            accountManagementSidebarTitle: "text-black",
            accountManagementSidebarSubtitle: "text-black",
            accountManagementSidebarContent: "bg-white",
            accountManagementSidebarFooter: "bg-white",
            
            // Navigation Items
            accountManagementNavItem: "text-black bg-white hover:bg-black/10",
            accountManagementNavItemActive: "bg-blue-500/20 text-black border-l-3 border-blue-500/80",
            accountManagementNavItemIcon: "text-black",
            accountManagementNavItemText: "text-black",
            
            // Profile Details
            profileDetails: "bg-white",
            profileDetailsHeader: "bg-white",
            profileDetailsTitle: "text-black",
            profileDetailsContent: "bg-white",
            profileDetailsSection: "bg-white border border-black/10",
            profileDetailsSectionTitle: "text-black",
            profileDetailsSectionContent: "bg-white",
            
            // Profile Avatar and Text
            profileAvatar: "bg-white",
            profileAvatarText: "text-black",
            profileName: "text-black",
            profileEmail: "text-black",
            
            // Connected Accounts
            connectedAccounts: "bg-white",
            connectedAccountsItem: "bg-white",
            connectedAccountsItemText: "text-black",
            connectedAccountsItemEmail: "text-black",
            connectedAccountsItemIcon: "text-black",
            
            // Action Buttons
            actionButton: "bg-white border border-black/10 text-black hover:bg-black/10",
            actionButtonPrimary: "bg-blue-500/80 border border-blue-500/80 text-white hover:bg-blue-500",
            
            // Modal Close Button
            modalCloseButton: "text-black bg-white hover:bg-black/10",
            
            // Form Fields
            formField: "bg-white border border-black/10 text-black",
            formFieldInput: "bg-white border border-black/10 text-black focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20",
            formFieldLabel: "text-black",
            formFieldError: "text-red-400",
            
            // Buttons
            button: "bg-white border border-blue-500/30 text-black hover:bg-blue-500/10 hover:border-blue-500/50",
            buttonPrimary: "bg-blue-500/80 border border-blue-500/80 text-white hover:bg-blue-500",
            
            // Modal
            modal: "bg-white/95 backdrop-blur-20",
            modalContent: "bg-white border border-black/10 shadow-2xl",
            modalHeader: "bg-white border-b border-black/10",
            modalTitle: "text-black",
            
            // Cards
            card: "bg-white border border-black/10",
            cardHeader: "bg-white border-b border-black/10",
            cardTitle: "text-black",
            cardContent: "bg-white",
            
            // User Profile
            userProfile: "bg-white border border-black/10",
            userProfileHeader: "bg-white border-b border-black/10",
            userProfileTitle: "text-black",
            userProfileSubtitle: "text-black/70",
            userProfileContent: "bg-white",
            userProfileSection: "bg-white border border-black/10",
            userProfileSectionTitle: "text-black",
            userProfileSectionContent: "bg-white",
            
            // Security Components
            securitySection: "bg-white border border-black/10",
            securitySectionTitle: "text-black",
            securitySectionContent: "bg-white",
            securityItem: "bg-white border border-black/10",
            securityItemTitle: "text-black",
            securityItemDescription: "text-black/70",
            securityItemAction: "bg-white border border-blue-500/30 text-black hover:bg-blue-500/10 hover:border-blue-500/50",
            
            // Settings Components
            settingsSection: "bg-white border border-black/10",
            settingsSectionTitle: "text-black",
            settingsSectionContent: "bg-white",
            settingsItem: "bg-white border border-black/10",
            settingsItemTitle: "text-black",
            settingsItemDescription: "text-black/70",
            settingsItemToggle: "bg-white border border-black/10",
            settingsItemToggleActive: "bg-blue-500/80 border-blue-500/80",
            
            // Notification Components
            notificationSection: "bg-white border border-black/10",
            notificationSectionTitle: "text-black",
            notificationSectionContent: "bg-white",
            notificationItem: "bg-white border border-black/10",
            notificationItemTitle: "text-black",
            notificationItemDescription: "text-black/70",
            notificationItemToggle: "bg-white border border-black/10",
            notificationItemToggleActive: "bg-blue-500/80 border-blue-500/80",
            
            // Data Table Components
            dataTable: "bg-white border border-black/10",
            dataTableHeader: "bg-white border-b border-black/10",
            dataTableHeaderCell: "text-black bg-white",
            dataTableRow: "bg-white border-b border-black/5 hover:bg-black/5",
            dataTableCell: "text-black bg-white",
            
            // Pagination Components
            pagination: "bg-white",
            paginationButton: "bg-white border border-black/10 text-black hover:bg-black/10",
            paginationButtonActive: "bg-blue-500/80 border-blue-500/80 text-white",
            
            // Loading States
            loadingSpinner: "border-blue-500/30 border-t-blue-500/80",
            loadingText: "text-black/70",
            
            // Error States
            errorMessage: "bg-red-500/10 border border-red-500/20 text-red-400",
            errorTitle: "text-red-400",
            errorDescription: "text-red-400/80",
            
            // Success States
            successMessage: "bg-green-500/10 border border-green-500/20 text-green-400",
            successTitle: "text-green-400",
            successDescription: "text-green-400/80",
            
            // Tooltip Components
            tooltip: "bg-white border border-black/10 text-black shadow-2xl",
            tooltipArrow: "border-white",
            
            // Dropdown Components
            dropdown: "bg-white border border-black/10 shadow-2xl",
            dropdownItem: "text-black bg-white hover:bg-black/10",
            dropdownDivider: "border-black/10"
          }
        }}
      />
    </div>
  )
}

export default ClerkAccountHandler
