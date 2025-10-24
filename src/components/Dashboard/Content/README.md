# Content Components

This folder contains components for displaying different types of educational content in the CMS.

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

#### Usage:
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
    pdf: '/path/to/notes.pdf',
    docs: '/path/to/document.docx',
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

#### Usage:
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
  contentType: 'video' | 'pdf'  // Content type
  videoUrl?: string             // Video file path
  pdfUrl?: string              // PDF file path
  timestamps?: Array<{         // Video timestamps
    time: number
    title: string
  }>
  description?: string         // Course description
  author?: string             // Instructor name
  content?: {                 // Additional content
    notes?: string            // Text notes
    links?: Array<{           // External links
      title: string
      url: string
    }>
  }
}

interface VideoPlayerProps {
  src: string
  title?: string
  timestamps?: Timestamp[]
  description?: string
  author?: string
  content?: CourseContent
  onClose?: () => void
  onProgress?: (progress: number) => void
  onComplete?: () => void
}
```

## File Structure

```
Content/
├── Video/
│   ├── VideoPlayer.tsx      # Enhanced video player
│   └── index.ts
├── Pdf/
│   ├── PdfViewer.tsx       # PDF viewer component
│   └── index.ts
└── README.md               # This file
```

## Integration

To use these components in your course system:

1. **Update Course Data**: Add the new `CourseContent` structure with `contentType` field
2. **Import Components**: Import both `VideoPlayer` and `PdfViewer` components
3. **Handle Content Types**: Check `contentType` to determine which viewer to use
4. **Pass Props**: Provide the necessary props including content metadata
5. **Handle Events**: Implement the callback functions for progress tracking and completion

### Course Box Integration Example:

```tsx
// In your course UI component
const handleContentClick = (lesson: CourseContent) => {
  if (lesson.contentType === 'video') {
    setSelectedContent({
      type: 'video',
      src: lesson.videoUrl,
      title: lesson.title,
      description: lesson.description,
      author: lesson.author,
      timestamps: lesson.timestamps,
      content: lesson.content
    })
  } else if (lesson.contentType === 'pdf') {
    setSelectedContent({
      type: 'pdf',
      src: lesson.pdfUrl,
      title: lesson.title,
      description: lesson.description,
      author: lesson.author
    })
  }
}

// Render content viewer
{selectedContent && (
  <>
    {selectedContent.type === 'video' && (
      <VideoPlayer {...videoProps} />
    )}
    {selectedContent.type === 'pdf' && (
      <PdfViewer {...pdfProps} />
    )}
  </>
)}
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
