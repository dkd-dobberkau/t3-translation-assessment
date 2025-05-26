#!/usr/bin/env python3
"""
Script to combine DRAFT folder files into a single document in the DOC folder.
Follows the order specified in table-of-contents.md.

Usage:
    python combine_draft_files.py          # Normal run
    python combine_draft_files.py --dry-run # Dry run (preview only)
"""

import os
import re
import sys
from pathlib import Path
from datetime import datetime

def get_file_order():
    """Define the order of files based on table-of-contents.md structure."""
    return [
        'executive-summary.md',
        'introduction.md',
        'project-framework.md',
        'current-state-analysis.md',
        'competitive-analysis.md',
        'gap-analysis.md',
        'community-engagement.md',
        'proof-of-concept.md',
        'improvement-recommendations.md',
        'technical-roadmap.md',
        'risk-management.md',
        'conclusion.md',
        'appendices.md',
        'glossary.md'
    ]

def clean_content(content, filename):
    """Clean and prepare content for combination."""
    # Remove the first-level heading if it exists (we'll add our own structure)
    lines = content.split('\n')
    if lines and lines[0].startswith('# '):
        lines = lines[1:]
    
    # Join back and strip extra whitespace
    cleaned = '\n'.join(lines).strip()
    
    # Fix image paths to be relative to the root directory
    cleaned = fix_image_paths(cleaned)
    
    # Ensure content ends with double newline for separation
    if cleaned and not cleaned.endswith('\n\n'):
        cleaned += '\n\n'
    
    return cleaned

def fix_image_paths(content):
    """Fix image paths to be correct relative to the root directory."""
    # Replace relative image paths with correct paths from root
    content = re.sub(r'!\[(.*?)\]\(([^)]+)\)', lambda m: fix_single_image_path(m), content)
    return content

def fix_single_image_path(match):
    """Fix a single image path match."""
    alt_text = match.group(1)
    path = match.group(2)
    
    # If path doesn't start with Images/ and doesn't start with http/https
    if not path.startswith(('http://', 'https://', 'Images/')):
        # Check if it's likely an image file
        if any(path.lower().endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg']):
            # Assume it should be in Images/ folder
            path = f"Images/{path}"
    
    return f"![{alt_text}]({path})"

def create_section_header(filename):
    """Create a section header based on filename."""
    # Map filenames to section numbers and titles
    section_map = {
        'executive-summary.md': 'Executive Summary',
        'introduction.md': '1. Introduction',
        'project-framework.md': '2. Project Framework',
        'current-state-analysis.md': '3. Current State Analysis',
        'competitive-analysis.md': '4. Competitive Analysis',
        'gap-analysis.md': '5. Gap Analysis',
        'community-engagement.md': '6. Community Engagement',
        'proof-of-concept.md': '7. Proof of Concept',
        'improvement-recommendations.md': '8. Improvement Recommendations',
        'technical-roadmap.md': '9. Technical Roadmap',
        'risk-management.md': '10. Risk Management',
        'conclusion.md': '11. Conclusion and Next Steps',
        'appendices.md': 'Appendices',
        'glossary.md': 'Glossary'
    }
    
    title = section_map.get(filename, filename.replace('-', ' ').replace('.md', '').title())
    return f"# {title}\n\n"

def combine_files(dry_run=False):
    """Main function to combine DRAFT files into a single document."""
    script_dir = Path(__file__).parent.parent  # Go up one level since we're in TOOLS
    draft_dir = script_dir / 'DRAFT'
    doc_dir = script_dir / 'DOC'
    
    # Generate filename with current date
    current_date = datetime.now().strftime('%Y-%m-%d')
    output_file = doc_dir / f'TYPO3_Translation_System_Analysis_Complete_Report_{current_date}.md'
    
    # Get file order
    file_order = get_file_order()
    
    print(f"{'DRY RUN: ' if dry_run else ''}Combining files from: {draft_dir}")
    print(f"{'DRY RUN: ' if dry_run else ''}Output file: {output_file}")
    print(f"{'DRY RUN: ' if dry_run else ''}Processing {len(file_order)} files in order:\n")
    
    if dry_run:
        # Dry run: just analyze and report
        total_chars = 0
        found_files = []
        missing_files = []
        image_issues = []
        
        for filename in file_order:
            file_path = draft_dir / filename
            
            if file_path.exists():
                print(f"✓ Found: {filename}")
                found_files.append(filename)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                        total_chars += len(content)
                        
                        # Check for image references
                        image_matches = re.findall(r'!\[(.*?)\]\(([^)]+)\)', content)
                        for alt_text, path in image_matches:
                            if not path.startswith(('http://', 'https://')):
                                # Check if image file exists
                                if path.startswith('Images/'):
                                    img_path = script_dir / path
                                else:
                                    img_path = script_dir / 'Images' / path
                                
                                if not img_path.exists():
                                    image_issues.append((filename, path, str(img_path)))
                        
                except Exception as e:
                    print(f"  ⚠️  Error reading {filename}: {e}")
            else:
                print(f"✗ Missing: {filename}")
                missing_files.append(filename)
        
        # Summary
        print(f"\n--- DRY RUN SUMMARY ---")
        print(f"Files found: {len(found_files)}/{len(file_order)}")
        print(f"Total content size: ~{total_chars:,} characters")
        
        if missing_files:
            print(f"\nMissing files:")
            for f in missing_files:
                print(f"  - {f}")
        
        if image_issues:
            print(f"\nImage path issues:")
            for filename, img_path, full_path in image_issues:
                print(f"  - {filename}: {img_path} -> {full_path}")
        else:
            print(f"\nNo image path issues detected.")
        
        if not dry_run:
            print(f"\nWould create DOC directory: {doc_dir}")
        
        return
    
    # Create DOC directory if it doesn't exist (only in real run)
    doc_dir.mkdir(exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as outfile:
        # Write document header
        outfile.write("# TYPO3 Translation System Analysis and Modernization\n")
        outfile.write("## Complete Report\n\n")
        outfile.write("---\n\n")
        
        # Process files in specified order
        for filename in file_order:
            file_path = draft_dir / filename
            
            if file_path.exists():
                print(f"Processing: {filename}")
                
                # Read file content
                try:
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                    
                    # Skip table-of-contents.md as it's not needed in combined document
                    if filename == 'table-of-contents.md':
                        continue
                    
                    # Add section header
                    outfile.write(create_section_header(filename))
                    
                    # Clean and write content
                    cleaned_content = clean_content(content, filename)
                    if cleaned_content:
                        outfile.write(cleaned_content)
                    
                    # Add page break comment for clarity
                    outfile.write("---\n\n")
                    
                except Exception as e:
                    print(f"Error processing {filename}: {e}")
            else:
                print(f"Warning: {filename} not found in DRAFT folder")
        
        # Add AI attribution
        outfile.write("---\n\n")
        outfile.write("_This content was generated with assistance from Claude AI._\n")
    
    print(f"\nCombined document created: {output_file}")
    print(f"Total files processed: {len([f for f in file_order if (draft_dir / f).exists()])}")

if __name__ == "__main__":
    # Check for dry run flag
    dry_run = "--dry-run" in sys.argv or "-n" in sys.argv
    combine_files(dry_run=dry_run)