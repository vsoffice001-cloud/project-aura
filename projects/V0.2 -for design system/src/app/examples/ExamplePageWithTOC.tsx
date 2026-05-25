/**
 * Example Page with Sticky TOC
 * 
 * Copy this entire file to create a new page with a sticky table of contents.
 * Just replace the content and headings with your own!
 */

import React from 'react';
import { TableOfContents, Section, Heading, Text } from '@/design-system/components';

function ExamplePageWithTOC() {
  return (
    <Section background="primary" paddingY="lg">
      {/* Container */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 240px',
        gap: '64px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        
        {/* ============================================================ */}
        {/* MAIN CONTENT - Replace with your content */}
        {/* ============================================================ */}
        <main style={{ minWidth: 0 }}>
          
          {/* Section 1 */}
          <Heading level="h1" id="introduction">
            Introduction
          </Heading>
          <Text variant="body">
            This is an example page with a sticky table of contents. 
            The TOC will automatically track which section you're viewing 
            and highlight it in the sidebar.
          </Text>
          <Text variant="body">
            Scroll down to see the TOC update as you read through different sections.
          </Text>
          
          {/* Section 2 */}
          <Heading level="h2" id="getting-started" style={{ marginTop: '48px' }}>
            Getting Started
          </Heading>
          <Text variant="body">
            To use this pattern in your own pages, simply copy this file 
            and replace the content. Make sure each heading has a unique ID.
          </Text>
          
          {/* Subsection 2.1 */}
          <Heading level="h3" id="installation" style={{ marginTop: '32px' }}>
            Installation
          </Heading>
          <Text variant="body">
            No installation needed - the TableOfContents component is already 
            part of your design system.
          </Text>
          
          {/* Subsection 2.2 */}
          <Heading level="h3" id="usage" style={{ marginTop: '32px' }}>
            Usage
          </Heading>
          <Text variant="body">
            Import the component and add it to your page layout. 
            It will automatically generate the TOC from your headings.
          </Text>
          
          {/* Section 3 */}
          <Heading level="h2" id="features" style={{ marginTop: '48px' }}>
            Features
          </Heading>
          <Text variant="body">
            The TableOfContents component includes many useful features:
          </Text>
          
          {/* Subsection 3.1 */}
          <Heading level="h3" id="auto-generation" style={{ marginTop: '32px' }}>
            Auto-Generation
          </Heading>
          <Text variant="body">
            The TOC automatically generates from all headings on the page. 
            No need to manually list items unless you want custom labels.
          </Text>
          
          {/* Subsection 3.2 */}
          <Heading level="h3" id="active-tracking" style={{ marginTop: '32px' }}>
            Active Section Tracking
          </Heading>
          <Text variant="body">
            The currently visible section is automatically highlighted in the TOC 
            using IntersectionObserver for smooth tracking.
          </Text>
          
          {/* Subsection 3.3 */}
          <Heading level="h3" id="smooth-scrolling" style={{ marginTop: '32px' }}>
            Smooth Scrolling
          </Heading>
          <Text variant="body">
            Clicking a TOC link smoothly scrolls to that section. 
            The URL is also updated to support deep linking.
          </Text>
          
          {/* Section 4 */}
          <Heading level="h2" id="customization" style={{ marginTop: '48px' }}>
            Customization
          </Heading>
          <Text variant="body">
            You can customize the TOC with various props:
          </Text>
          
          {/* Subsection 4.1 */}
          <Heading level="h3" id="custom-title" style={{ marginTop: '32px' }}>
            Custom Title
          </Heading>
          <Text variant="body">
            Change the title from "On This Page" to anything you like 
            using the title prop.
          </Text>
          
          {/* Subsection 4.2 */}
          <Heading level="h3" id="sticky-position" style={{ marginTop: '32px' }}>
            Sticky Position
          </Heading>
          <Text variant="body">
            Adjust the top position to account for your header height 
            using the top prop (default is "100px").
          </Text>
          
          {/* Subsection 4.3 */}
          <Heading level="h3" id="manual-items" style={{ marginTop: '32px' }}>
            Manual Items
          </Heading>
          <Text variant="body">
            Provide custom items array if you want full control over 
            what appears in the TOC and how it's labeled.
          </Text>
          
          {/* Section 5 */}
          <Heading level="h2" id="best-practices" style={{ marginTop: '48px' }}>
            Best Practices
          </Heading>
          <Text variant="body">
            Follow these best practices for the best experience:
          </Text>
          
          {/* Subsection 5.1 */}
          <Heading level="h3" id="use-semantic-headings" style={{ marginTop: '32px' }}>
            Use Semantic Headings
          </Heading>
          <Text variant="body">
            Always use proper heading hierarchy (h1, h2, h3) and don't skip levels. 
            This helps with both accessibility and TOC generation.
          </Text>
          
          {/* Subsection 5.2 */}
          <Heading level="h3" id="unique-ids" style={{ marginTop: '32px' }}>
            Unique IDs
          </Heading>
          <Text variant="body">
            Make sure each heading has a unique ID. Use descriptive, 
            URL-friendly IDs like "getting-started" instead of "section1".
          </Text>
          
          {/* Subsection 5.3 */}
          <Heading level="h3" id="responsive-layout" style={{ marginTop: '32px' }}>
            Responsive Layout
          </Heading>
          <Text variant="body">
            Hide the TOC on mobile devices and show it only on larger screens 
            where there's enough space.
          </Text>
          
          {/* Section 6 */}
          <Heading level="h2" id="conclusion" style={{ marginTop: '48px' }}>
            Conclusion
          </Heading>
          <Text variant="body">
            The sticky TOC component makes it easy to add navigation to long 
            documents, blog posts, and documentation pages. Try scrolling through 
            this page to see it in action!
          </Text>
          <Text variant="body">
            Remember: Just copy this file, replace the content, and you're done!
          </Text>
          
        </main>
        
        {/* ============================================================ */}
        {/* STICKY TOC SIDEBAR - Usually no changes needed here */}
        {/* ============================================================ */}
        <aside>
          <TableOfContents 
            title="On This Page"
            top="100px"
            showActiveIndicator={true}
            smoothScroll={true}
          />
        </aside>
        
      </div>
    </Section>
  );
}

export default ExamplePageWithTOC;
