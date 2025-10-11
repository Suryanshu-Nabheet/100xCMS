'use client'
import React from 'react'
import { UserProfile } from '@clerk/clerk-react'

interface ClerkAccountManagementProps {
  className?: string
}

export const ClerkAccountManagement: React.FC<ClerkAccountManagementProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <UserProfile 
        appearance={{
          baseTheme: undefined,
          elements: {
            // Main container styling
            userProfile: "bg-white border border-black/10",
            userProfileHeader: "bg-white border-b border-black/10",
            userProfileTitle: "text-black",
            userProfileSubtitle: "text-black/70",
            userProfileContent: "bg-white",
            
            // Modal/Sidebar styling
            modal: "bg-white/95 backdrop-blur-20",
            modalContent: "bg-white border border-black/10 shadow-2xl",
            modalHeader: "bg-white border-b border-black/10",
            modalTitle: "text-black",
            modalCloseButton: "text-black bg-white hover:bg-black/10",
            
            // Sidebar styling
            sidebar: "bg-white border-r border-black/10",
            sidebarHeader: "bg-white border-b border-black/10",
            sidebarTitle: "text-black",
            sidebarSubtitle: "text-black/70",
            sidebarContent: "bg-white",
            sidebarFooter: "bg-white",
            
            // Navigation styling
            nav: "bg-white",
            navItem: "text-black bg-white hover:bg-black/10 transition-all duration-200",
            navItemActive: "bg-blue-500/20 text-black border-l-3 border-blue-500/80",
            navItemIcon: "text-black",
            navItemText: "text-black font-medium",
            
            // Profile details styling
            profileDetails: "bg-white",
            profileDetailsHeader: "bg-white",
            profileDetailsTitle: "text-black font-semibold",
            profileDetailsContent: "bg-white",
            profileDetailsSection: "bg-white border border-black/10",
            profileDetailsSectionTitle: "text-black font-medium",
            profileDetailsSectionContent: "bg-white",
            
            // Avatar styling
            avatar: "bg-white",
            avatarBox: "bg-white",
            avatarImage: "bg-white",
            avatarText: "text-black",
            profileName: "text-black font-semibold",
            profileEmail: "text-black/80",
            
            // Form fields styling
            formField: "bg-white",
            formFieldInput: "bg-white border border-black/10 text-black focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20",
            formFieldLabel: "text-black font-medium",
            formFieldError: "text-red-400",
            formFieldSuccess: "text-green-400",
            
            // Button styling
            button: "bg-white border border-blue-500/30 text-black hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-200",
            buttonPrimary: "bg-blue-500/80 border border-blue-500/80 text-white hover:bg-blue-500 transition-all duration-200",
            buttonSecondary: "bg-white border border-black/10 text-black hover:bg-black/10 transition-all duration-200",
            buttonDanger: "bg-red-500/80 border border-red-500/80 text-white hover:bg-red-500 transition-all duration-200",
            
            // Card styling
            card: "bg-white border border-black/10",
            cardHeader: "bg-white border-b border-black/10",
            cardTitle: "text-black font-semibold",
            cardContent: "bg-white",
            cardFooter: "bg-white border-t border-black/10",
            
            // Security section styling
            securitySection: "bg-white border border-black/10",
            securitySectionTitle: "text-black font-semibold",
            securitySectionContent: "bg-white",
            securityItem: "bg-white border border-black/10",
            securityItemTitle: "text-black font-medium",
            securityItemDescription: "text-black/70",
            securityItemAction: "bg-white border border-blue-500/30 text-black hover:bg-blue-500/10 hover:border-blue-500/50",
            
            // Settings section styling
            settingsSection: "bg-white border border-black/10",
            settingsSectionTitle: "text-black font-semibold",
            settingsSectionContent: "bg-white",
            settingsItem: "bg-white border border-black/10",
            settingsItemTitle: "text-black font-medium",
            settingsItemDescription: "text-black/70",
            settingsItemToggle: "bg-white border border-black/10",
            settingsItemToggleActive: "bg-blue-500/80 border-blue-500/80",
            
            // Notification section styling
            notificationSection: "bg-white border border-black/10",
            notificationSectionTitle: "text-black font-semibold",
            notificationSectionContent: "bg-white",
            notificationItem: "bg-white border border-black/10",
            notificationItemTitle: "text-black font-medium",
            notificationItemDescription: "text-black/70",
            notificationItemToggle: "bg-white border border-black/10",
            notificationItemToggleActive: "bg-blue-500/80 border-blue-500/80",
            
            // Connected accounts styling
            connectedAccounts: "bg-white",
            connectedAccountsHeader: "bg-white border-b border-black/10",
            connectedAccountsTitle: "text-black font-semibold",
            connectedAccountsContent: "bg-white",
            connectedAccountsItem: "bg-white border border-black/10",
            connectedAccountsItemText: "text-black font-medium",
            connectedAccountsItemEmail: "text-black/80",
            connectedAccountsItemIcon: "text-black",
            connectedAccountsItemAction: "bg-white border border-blue-500/30 text-black hover:bg-blue-500/10 hover:border-blue-500/50",
            
            // Data table styling
            dataTable: "bg-white border border-black/10",
            dataTableHeader: "bg-white border-b border-black/10",
            dataTableHeaderCell: "text-black bg-white font-medium",
            dataTableRow: "bg-white border-b border-black/5 hover:bg-black/5 transition-colors duration-200",
            dataTableCell: "text-black bg-white",
            
            // Pagination styling
            pagination: "bg-white",
            paginationButton: "bg-white border border-black/10 text-black hover:bg-black/10 transition-all duration-200",
            paginationButtonActive: "bg-blue-500/80 border-blue-500/80 text-white",
            paginationButtonDisabled: "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed",
            
            // Loading states
            loadingSpinner: "border-blue-500/30 border-t-blue-500/80",
            loadingText: "text-black/70",
            loadingOverlay: "bg-white/80 backdrop-blur-sm",
            
            // Error states
            errorMessage: "bg-red-500/10 border border-red-500/20 text-red-400",
            errorTitle: "text-red-400 font-semibold",
            errorDescription: "text-red-400/80",
            errorIcon: "text-red-400",
            
            // Success states
            successMessage: "bg-green-500/10 border border-green-500/20 text-green-400",
            successTitle: "text-green-400 font-semibold",
            successDescription: "text-green-400/80",
            successIcon: "text-green-400",
            
            // Warning states
            warningMessage: "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400",
            warningTitle: "text-yellow-400 font-semibold",
            warningDescription: "text-yellow-400/80",
            warningIcon: "text-yellow-400",
            
            // Info states
            infoMessage: "bg-blue-500/10 border border-blue-500/20 text-blue-400",
            infoTitle: "text-blue-400 font-semibold",
            infoDescription: "text-blue-400/80",
            infoIcon: "text-blue-400",
            
            // Tooltip styling
            tooltip: "bg-white border border-black/10 text-black shadow-2xl",
            tooltipArrow: "border-white",
            tooltipContent: "text-black",
            
            // Dropdown styling
            dropdown: "bg-white border border-black/10 shadow-2xl",
            dropdownItem: "text-black bg-white hover:bg-black/10 transition-colors duration-200",
            dropdownDivider: "border-black/10",
            dropdownHeader: "bg-white border-b border-black/10",
            dropdownTitle: "text-black font-semibold",
            
            // Accordion styling
            accordion: "bg-white border border-black/10",
            accordionItem: "bg-white border-b border-black/5",
            accordionHeader: "bg-white",
            accordionTitle: "text-black font-medium",
            accordionContent: "bg-white",
            accordionIcon: "text-black",
            
            // Tab styling
            tabList: "bg-white border-b border-black/10",
            tab: "text-black hover:text-blue-500 transition-colors duration-200",
            tabActive: "text-blue-500 border-b-2 border-blue-500",
            tabPanel: "bg-white",
            tabContent: "text-black",
            
            // Badge styling
            badge: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
            badgeSuccess: "bg-green-500/20 text-green-400 border border-green-500/30",
            badgeWarning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            badgeError: "bg-red-500/20 text-red-400 border border-red-500/30",
            badgeInfo: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
            
            // Progress bar styling
            progressBar: "bg-gray-200",
            progressBarFill: "bg-blue-500",
            progressBarText: "text-black",
            
            // Divider styling
            divider: "border-black/10",
            
            // Spinner styling
            spinner: "border-blue-500/30 border-t-blue-500/80",
            spinnerSmall: "w-4 h-4",
            spinnerMedium: "w-6 h-6",
            spinnerLarge: "w-8 h-8"
          }
        }}
      />
    </div>
  )
}

export default ClerkAccountManagement
