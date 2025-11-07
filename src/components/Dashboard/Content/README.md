# Content Components

This folder contains components for displaying different types of educational content in the CMS.

## Structure

```
Content/
├── Video/
│   ├── VideoPlayer.tsx      # Enhanced video player
│   └── index.ts
├── Pdf/
│   ├── PdfViewer.tsx       # PDF viewer component
│   └── index.ts
├── CompleteWebDevDevOpsBlockchain/    # Course-specific content
├── CompleteWebDevDevOps/              # Course-specific content
├── CompleteWeb3Blockchain/            # Course-specific content
├── CompleteWebDev/                      # Course-specific content
├── CompleteDevOps/                     # Course-specific content
├── Live0to100Complete/                # Course-specific content
├── Live0to1/                          # Course-specific content
├── Live1to100/                        # Course-specific content
├── FullStackOpenSourceCohort1/        # Course-specific content
└── README.md                          # This file
```

## Course Folders

Each course has its own folder where you can organize:
- Course-specific components
- Course-specific utilities
- Course-specific content handlers
- Course-specific assets

### Available Courses:

1. **CompleteWebDevDevOpsBlockchain** - Complete Web Development + DevOps + Blockchain Cohort
2. **CompleteWebDevDevOps** - Complete Web Development + DevOps Cohort
3. **CompleteWeb3Blockchain** - Complete Web3/Blockchain Cohort
4. **CompleteWebDev** - Complete Web Development Cohort
5. **CompleteDevOps** - Complete DevOps Cohort
6. **Live0to100Complete** - Live 0-100 Complete
7. **Live0to1** - Live 0-1
8. **Live1to100** - Live 1-100
9. **FullStackOpenSourceCohort1** - Full Stack Open Source Cohort 1

## Components

### Video Player (`Video/VideoPlayer.tsx`)

An enhanced video player with YouTube-like features including:

- **Video Controls**: Play/pause, volume, fullscreen, picture-in-picture
- **Timestamps/Chapters**: Navigate through video sections
- **Description Section**: Expandable description with course information, notes, and links
- **Keyboard Shortcuts**: Full keyboard navigation support

#### Features:
- Responsive design with 70/30 layout (video/content)
- Auto-hiding controls
- Skip animations
- Error handling with fallback sources
- Progress tracking
- Multiple playback speeds

### PDF Viewer (`Pdf/PdfViewer.tsx`)

A full-featured PDF viewer with:

- **Zoom Controls**: Zoom in/out, reset zoom
- **Rotation**: Rotate PDF pages
- **Fullscreen**: Fullscreen viewing mode
- **Download**: Download PDF files
- **Keyboard Shortcuts**: Navigate with keyboard
- **Error Handling**: Graceful error handling

#### Features:
- Embedded PDF viewing
- Responsive design
- Loading states
- Error recovery
- Keyboard navigation

## Usage

### Video Player
```tsx
<VideoPlayer
  src="/path/to/video.mp4"
  title="Course Title"
  description="Course description..."
  author="Instructor Name"
  timestamps={[
    { time: 0, title: 'Introduction' },
    { time: 30, title: 'Main Content' }
  ]}
  content={{
    notes: 'Additional notes...',
    links: [
      { title: 'Resource Link', url: 'https://example.com' }
    ]
  }}
  onClose={() => {}}
  onProgress={(progress) => {}}
  onComplete={() => {}}
/>
```

### PDF Viewer
```tsx
<PdfViewer
  src="/path/to/document.pdf"
  title="Document Title"
  onClose={() => {}}
/>
```

## Course Data Structure

The enhanced video player expects course data with the following structure:

```typescript
interface CourseContent {
  id: string
  title: string
  thumbnail: string
  duration: string
  completed: boolean
  contentType: 'video' | 'pdf'
  videoUrl?: string
  pdfUrl?: string
  timestamps?: Array<{
    time: number
    title: string
  }>
  description?: string
  author?: string
  content?: {
    notes?: string
    links?: Array<{
      title: string
      url: string
    }>
  }
}
```

## Keyboard Shortcuts

### Video Player
- `Space`: Play/pause
- `←/→`: Skip 10 seconds
- `↑/↓`: Volume control
- `M`: Mute/unmute
- `F`: Fullscreen
- `0-9`: Jump to percentage
- `Esc`: Close player

### PDF Viewer
- `F`: Fullscreen
- `+/-`: Zoom in/out
- `0`: Reset zoom
- `R`: Rotate
- `Esc`: Close viewer

## Styling

All components use Tailwind CSS for styling and are designed to be responsive and accessible. The components follow a dark theme with modern UI patterns similar to YouTube and other modern video platforms.
