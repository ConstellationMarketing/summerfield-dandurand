import { useState } from 'react';
import type { ContentBlock } from '../../lib/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Type,
  Phone,
  Layout,
  Users,
  Grid,
  MessageSquare,
  MapPin,
  FileText,
  Megaphone,
  Mail,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import RichTextEditor from '@site/components/admin/RichTextEditor';

interface BlockEditorProps {
  content: ContentBlock[];
  onChange: (content: ContentBlock[]) => void;
}

const BLOCK_TYPES = [
  { type: 'hero', label: 'Hero Section', icon: Layout },
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'attorney-profile', label: 'Attorney Profile', icon: Users },
  { type: 'attorney-credentials', label: 'Attorney Credentials', icon: FileText },
  { type: 'content-section', label: 'Content Section', icon: FileText },
  { type: 'cta', label: 'Call to Action', icon: Megaphone },
  { type: 'team-members', label: 'Team Members', icon: Users },
  { type: 'testimonials', label: 'Testimonials Carousel', icon: MessageSquare },
  { type: 'testimonials-showcase', label: 'Testimonials Showcase', icon: MessageSquare },
  { type: 'contact-section', label: 'Contact Section', icon: Mail },
  { type: 'map', label: 'Map', icon: MapPin },
  { type: 'practice-areas-grid', label: 'Practice Areas Grid', icon: Grid },
  { type: 'recent-posts', label: 'Recent Blog Posts', icon: Grid },
  { type: 'locations-hub', label: 'Locations Hub', icon: MapPin },
] as const;

const ICON_OPTIONS = [
  'Car', 'Truck', 'Bike', 'Footprints', 'AlertTriangle', 'Building',
  'FileText', 'Scale', 'Briefcase', 'Users', 'Home', 'DollarSign',
  'Heart', 'Shield', 'TrendingUp', 'Stethoscope',
];

function getDefaultBlock(type: string): ContentBlock {
  switch (type) {
    case 'hero':
      return { type: 'hero', sectionLabel: '– Practice Area', tagline: 'Page Title', description: '<p>Enter a description here...</p>' };
    case 'heading':
      return { type: 'heading', level: 2, text: 'Section Heading' };
    case 'attorney-profile':
      return {
        type: 'attorney-profile',
        sectionLabel: '– Attorney Profile',
        name: 'Attorney Name',
        title: 'Attorney Title',
        email: '',
        image: '/placeholder.svg',
        imageAlt: '',
        biography: '<p>Enter the attorney biography...</p>',
      };
    case 'attorney-credentials':
      return {
        type: 'attorney-credentials',
        sectionLabel: '– Background & Experience',
        heading: 'Credentials',
        groups: [{ heading: 'Education', items: ['Degree and institution'] }],
      };
    case 'content-section':
      return { type: 'content-section', body: '<p>Enter your content here...</p>', imagePosition: 'right' };
    case 'cta':
      return { type: 'cta', heading: 'Ready to Get Started?', description: '<p>Contact us today for a free consultation.</p>' };
    case 'team-members':
      return { type: 'team-members', sectionLabel: '– Our Team', heading: 'Meet Our Attorneys', members: [{ name: 'Attorney Name', title: 'Partner', bio: '<p>Bio...</p>', image: '/placeholder.svg', imageAlt: '', specialties: [] }] };
    case 'testimonials':
      return { type: 'testimonials', sectionLabel: '– Testimonials', heading: 'What Our Clients Say', backgroundImageAlt: '', items: [{ text: 'Great service and results!', author: 'Client', ratingImage: '/images/logos/rating-stars.png', ratingImageAlt: '' }] };
    case 'testimonials-showcase':
      return { type: 'testimonials-showcase', sectionLabel: 'Client Testimonials', heading: 'What Our Clients Say', description: '<p>Read what clients have shared about their experience.</p>', items: [{ text: 'Testimonial text', author: 'Client', category: 'Legal Services' }], reviewLinks: [] };
    case 'contact-section':
      return { type: 'contact-section', sectionLabel: '– Contact Us', heading: 'Get your FREE case evaluation today.', description: 'We are here to help you with your legal needs.', formHeading: 'Contact Us Today To Schedule a Consultation' };
    case 'map':
      return { type: 'map', heading: 'Our Location', subtext: '', mapEmbedUrl: '' };
    case 'practice-areas-grid':
      return { type: 'practice-areas-grid', heading: 'Our Practice Areas', areas: [{ icon: 'Scale', title: 'Practice Area', description: 'Description', image: '/placeholder.svg', imageAlt: '', link: '/contact' }] };
    case 'recent-posts':
      return { type: 'recent-posts', sectionLabel: '– Latest Articles', heading: 'Recent Blog Posts', postCount: 6 };
    case 'locations-hub':
      return {
        type: 'locations-hub',
        sectionLabel: 'Areas We Serve',
        heading: 'Legal Help Across Indiana and Illinois',
        description: '<p>Tell visitors about the communities you serve.</p>',
        officesHeading: 'Visit Custom Law',
        offices: [{ city: 'Noblesville', state: 'Indiana', address: '', link: '' }],
        primaryHeading: 'Primary Service Locations',
        primaryLocations: [{ name: 'Noblesville, Indiana', link: '' }],
        coverageHeading: 'Additional Communities We Serve',
        coverageDescription: '<p>List the surrounding counties and communities.</p>',
        regions: [{ name: 'Indiana Counties', locations: ['Hamilton'] }],
        servicesHeading: 'Legal Services Throughout the Region',
        services: [{ title: 'Criminal Defense', link: '/criminal-defense/', icon: 'Shield' }],
      };
    default:
      return { type: 'heading', level: 2, text: 'New Section' };
  }
}

export default function BlockEditor({ content, onChange }: BlockEditorProps) {
  if (!Array.isArray(content)) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        This page uses structured content and should be edited with its dedicated editor.
      </div>
    );
  }

  const addBlock = (type: string) => {
    const newBlock = getDefaultBlock(type);
    onChange([...content, newBlock]);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], ...updates } as ContentBlock;
    onChange(newContent);
  };

  const removeBlock = (index: number) => {
    onChange(content.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= content.length) return;
    const newContent = [...content];
    [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
    onChange(newContent);
  };

  return (
    <div className="space-y-4">
      {content.map((block, index) => (
        <BlockCard
          key={index}
          block={block}
          index={index}
          total={content.length}
          onUpdate={(updates) => updateBlock(index, updates)}
          onRemove={() => removeBlock(index)}
          onMove={(dir) => moveBlock(index, dir)}
        />
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" />
            Add Block
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
            <DropdownMenuItem key={type} onClick={() => addBlock(type)}>
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BlockCard                                                          */
/* ------------------------------------------------------------------ */

interface BlockCardProps {
  block: ContentBlock;
  index: number;
  total: number;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onRemove: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

function BlockCard({ block, index, total, onUpdate, onRemove, onMove }: BlockCardProps) {
  const [expanded, setExpanded] = useState(true);
  const blockInfo = BLOCK_TYPES.find(b => b.type === block.type);
  const Icon = blockInfo?.icon || FileText;

  return (
    <Card>
      <CardHeader className="py-3 px-4">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
          <Icon className="h-4 w-4 text-gray-500" />
          <CardTitle
            className="text-sm font-medium flex-1 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {blockInfo?.label || block.type}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => onMove('up')} disabled={index === 0} className="h-8 w-8 p-0">
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onMove('down')} disabled={index === total - 1} className="h-8 w-8 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRemove} className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0">
          <BlockFields block={block} onUpdate={onUpdate} />
        </CardContent>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  BlockFields – editor forms for each block type                     */
/* ------------------------------------------------------------------ */

function BlockFields({ block, onUpdate }: { block: ContentBlock; onUpdate: (updates: Partial<ContentBlock>) => void }) {
  switch (block.type) {
    case 'hero':
      return <HeroFields block={block} onUpdate={onUpdate} />;
    case 'heading':
      return <HeadingFields block={block} onUpdate={onUpdate} />;
    case 'attorney-profile':
      return <AttorneyProfileFields block={block} onUpdate={onUpdate} />;
    case 'attorney-credentials':
      return <AttorneyCredentialsFields block={block} onUpdate={onUpdate} />;
    case 'content-section':
      return <ContentSectionFields block={block} onUpdate={onUpdate} />;
    case 'cta':
      return <CTAFields block={block} onUpdate={onUpdate} />;
    case 'team-members':
      return <TeamMembersFields block={block} onUpdate={onUpdate} />;
    case 'testimonials':
      return <TestimonialsFields block={block} onUpdate={onUpdate} />;
    case 'testimonials-showcase':
      return <TestimonialsShowcaseFields block={block} onUpdate={onUpdate} />;
    case 'contact-section':
      return <ContactSectionFields block={block} onUpdate={onUpdate} />;
    case 'map':
      return <MapFields block={block} onUpdate={onUpdate} />;
    case 'practice-areas-grid':
      return <PracticeAreasGridFields block={block} onUpdate={onUpdate} />;
    case 'recent-posts':
      return <RecentPostsFields block={block} onUpdate={onUpdate} />;
    case 'locations-hub':
      return <LocationsHubFields block={block} onUpdate={onUpdate} />;
    default:
      return <p className="text-gray-500 text-sm">Legacy block — no editor available. Please replace with a new block type.</p>;
  }
}

/* ------------------------------------------------------------------ */
/*  Hero Fields                                                        */
/* ------------------------------------------------------------------ */
function HeroFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'hero' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Label</Label>
        <Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} placeholder="– Practice Area" />
      </div>
      <div>
        <Label>Tagline</Label>
        <Input value={block.tagline} onChange={(e) => onUpdate({ tagline: e.target.value })} placeholder="Main heading text" />
      </div>
      <div>
        <Label>Description</Label>
        <RichTextEditor value={block.description} onChange={(html) => onUpdate({ description: html })} placeholder="Hero description..." />
      </div>
      <div>
        <Label>Background Image URL</Label>
        <Input value={block.backgroundImage || ''} onChange={(e) => onUpdate({ backgroundImage: e.target.value })} placeholder="https://..." />
      </div>
      <div>
        <Label>Background Image Alt Text</Label>
        <Input value={block.backgroundImageAlt || ''} onChange={(e) => onUpdate({ backgroundImageAlt: e.target.value })} placeholder="Describe the background image" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Heading Fields                                                     */
/* ------------------------------------------------------------------ */
function HeadingFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'heading' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Text</Label>
        <Input value={block.text} onChange={(e) => onUpdate({ text: e.target.value })} />
      </div>
      <div>
        <Label>Level (SEO only — visual style stays the same)</Label>
        <Select value={String(block.level)} onValueChange={(v) => onUpdate({ level: Number(v) as 1 | 2 | 3 })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1">H1 - Main Title</SelectItem>
            <SelectItem value="2">H2 - Section Title</SelectItem>
            <SelectItem value="3">H3 - Subsection</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Attorney Profile Fields                                            */
/* ------------------------------------------------------------------ */
function AttorneyProfileFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'attorney-profile' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Label</Label>
        <Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} />
      </div>
      <div>
        <Label>Attorney Name</Label>
        <Input value={block.name} onChange={(e) => onUpdate({ name: e.target.value })} />
      </div>
      <div>
        <Label>Title</Label>
        <Input value={block.title} onChange={(e) => onUpdate({ title: e.target.value })} />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" value={block.email} onChange={(e) => onUpdate({ email: e.target.value })} placeholder="attorney@example.com" />
      </div>
      <div>
        <Label>Portrait Image URL</Label>
        <Input value={block.image} onChange={(e) => onUpdate({ image: e.target.value })} placeholder="https://..." />
      </div>
      <div>
        <Label>Portrait Alt Text</Label>
        <Input value={block.imageAlt} onChange={(e) => onUpdate({ imageAlt: e.target.value })} placeholder="Describe the attorney portrait" />
      </div>
      <div>
        <Label>Biography</Label>
        <RichTextEditor value={block.biography} onChange={(html) => onUpdate({ biography: html })} placeholder="Attorney biography..." minHeight="260px" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Attorney Credentials Fields                                        */
/* ------------------------------------------------------------------ */
function AttorneyCredentialsFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'attorney-credentials' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const updateGroup = (index: number, updates: Partial<typeof block.groups[number]>) => {
    const groups = [...block.groups];
    groups[index] = { ...groups[index], ...updates };
    onUpdate({ groups });
  };

  const removeGroup = (index: number) => {
    onUpdate({ groups: block.groups.filter((_, groupIndex) => groupIndex !== index) });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Section Label</Label>
        <Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} />
      </div>
      <div>
        <Label>Heading</Label>
        <Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} />
      </div>

      <Label className="font-semibold">Credential Groups</Label>
      {block.groups.map((group, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Group {index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeGroup(index)} className="text-red-500 h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Group Heading</Label>
            <Input value={group.heading} onChange={(e) => updateGroup(index, { heading: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Items (one per line)</Label>
            <Textarea
              value={group.items.join('\n')}
              onChange={(e) => updateGroup(index, { items: e.target.value.split('\n').map((item) => item.trim()).filter(Boolean) })}
              rows={5}
            />
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => onUpdate({ groups: [...block.groups, { heading: 'New Group', items: ['New credential'] }] })}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Credential Group
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content Section Fields                                             */
/* ------------------------------------------------------------------ */
function ContentSectionFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'content-section' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const secondary = block.secondaryButton || { label: '', sublabel: '', link: '' };

  return (
    <div className="space-y-4">
      <div>
        <Label>Body Content</Label>
        <RichTextEditor value={block.body} onChange={(html) => onUpdate({ body: html })} placeholder="Section content..." minHeight="200px" />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input value={block.image || ''} onChange={(e) => onUpdate({ image: e.target.value })} placeholder="https://..." />
      </div>
      <div>
        <Label>Image Alt Text</Label>
        <Input value={block.imageAlt || ''} onChange={(e) => onUpdate({ imageAlt: e.target.value })} placeholder="Describe the image" />
      </div>
      <div>
        <Label>Image Position</Label>
        <Select value={block.imagePosition} onValueChange={(v) => onUpdate({ imagePosition: v as 'left' | 'right' })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="right">Right (text left, image right)</SelectItem>
            <SelectItem value="left">Left (image left, text right)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={block.showCTAs !== false} onCheckedChange={(checked) => onUpdate({ showCTAs: checked })} />
        <Label>Show CTA Buttons (phone & schedule)</Label>
      </div>
      <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
        <Label className="font-semibold">Schedule Button</Label>
        <div>
          <Label className="text-xs text-gray-500">Button Title</Label>
          <Input value={secondary.label} onChange={(e) => onUpdate({ secondaryButton: { ...secondary, label: e.target.value } })} />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Button Subtitle</Label>
          <Input value={secondary.sublabel} onChange={(e) => onUpdate({ secondaryButton: { ...secondary, sublabel: e.target.value } })} />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Button Link</Label>
          <Input value={secondary.link} onChange={(e) => onUpdate({ secondaryButton: { ...secondary, link: e.target.value } })} placeholder="/contact/" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Fields                                                         */
/* ------------------------------------------------------------------ */
function CTAFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'cta' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const secondary = block.secondaryButton || { label: '', sublabel: '', link: '' };

  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} />
      </div>
      <div>
        <Label>Description</Label>
        <RichTextEditor value={block.description} onChange={(html) => onUpdate({ description: html })} placeholder="CTA description..." />
      </div>
      <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
        <Label className="font-semibold">Secondary Button (optional)</Label>
        <div>
          <Label className="text-xs text-gray-500">Button Title</Label>
          <Input value={secondary.label} onChange={(e) => onUpdate({ secondaryButton: { ...secondary, label: e.target.value } })} placeholder="e.g. Schedule Now" />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Button Subtitle</Label>
          <Input value={secondary.sublabel} onChange={(e) => onUpdate({ secondaryButton: { ...secondary, sublabel: e.target.value } })} placeholder="e.g. Consultation details" />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Button Link</Label>
          <Input value={secondary.link} onChange={(e) => onUpdate({ secondaryButton: { ...secondary, link: e.target.value } })} placeholder="/contact" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Members Fields                                                */
/* ------------------------------------------------------------------ */
function TeamMembersFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'team-members' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const updateMember = (idx: number, updates: Partial<typeof block.members[0]>) => {
    const newMembers = [...block.members];
    newMembers[idx] = { ...newMembers[idx], ...updates };
    onUpdate({ members: newMembers });
  };

  const addMember = () => {
    onUpdate({ members: [...block.members, { name: 'New Member', title: 'Title', bio: '<p>Bio...</p>', image: '/placeholder.svg', imageAlt: '', specialties: [] }] });
  };

  const removeMember = (idx: number) => {
    onUpdate({ members: block.members.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Section Label</Label>
        <Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} />
      </div>
      <div>
        <Label>Heading</Label>
        <Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} />
      </div>

      <Label className="font-semibold">Team Members</Label>
      {block.members.map((member, idx) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Member {idx + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeMember(idx)} className="text-red-500 h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Name</Label>
            <Input value={member.name} onChange={(e) => updateMember(idx, { name: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Title</Label>
            <Input value={member.title} onChange={(e) => updateMember(idx, { title: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Image URL</Label>
            <Input value={member.image} onChange={(e) => updateMember(idx, { image: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Image Alt Text</Label>
            <Input value={member.imageAlt || ''} onChange={(e) => updateMember(idx, { imageAlt: e.target.value })} placeholder="Describe the photo" />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Bio</Label>
            <RichTextEditor value={member.bio} onChange={(html) => updateMember(idx, { bio: html })} placeholder="Member bio..." />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Specialties (comma-separated)</Label>
            <Input value={(member.specialties || []).join(', ')} onChange={(e) => updateMember(idx, { specialties: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Criminal Law, Civil Rights" />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addMember} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Member
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials Fields                                                */
/* ------------------------------------------------------------------ */
function TestimonialsFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'testimonials' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const updateItem = (idx: number, updates: Partial<typeof block.items[0]>) => {
    const newItems = [...block.items];
    newItems[idx] = { ...newItems[idx], ...updates };
    onUpdate({ items: newItems });
  };

  const addItem = () => {
    onUpdate({ items: [...block.items, { text: 'Testimonial text...', author: 'Client Name', ratingImage: '/images/logos/rating-stars.png', ratingImageAlt: '' }] });
  };

  const removeItem = (idx: number) => {
    onUpdate({ items: block.items.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Section Label</Label>
        <Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} />
      </div>
      <div>
        <Label>Heading</Label>
        <Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} />
      </div>
      <div>
        <Label>Background Image URL</Label>
        <Input value={block.backgroundImage || ''} onChange={(e) => onUpdate({ backgroundImage: e.target.value })} placeholder="https://..." />
      </div>
      <div>
        <Label>Background Image Alt Text</Label>
        <Input value={block.backgroundImageAlt || ''} onChange={(e) => onUpdate({ backgroundImageAlt: e.target.value })} placeholder="Describe the background image" />
      </div>

      <Label className="font-semibold">Testimonials</Label>
      {block.items.map((item, idx) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Testimonial {idx + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeItem(idx)} className="text-red-500 h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Testimonial Text</Label>
            <RichTextEditor value={item.text} onChange={(html) => updateItem(idx, { text: html })} placeholder="Client testimonial..." />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Author</Label>
            <Input value={item.author} onChange={(e) => updateItem(idx, { author: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Rating Image URL</Label>
            <Input value={item.ratingImage || ''} onChange={(e) => updateItem(idx, { ratingImage: e.target.value })} placeholder="/images/logos/rating-stars.png" />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Rating Image Alt Text</Label>
            <Input value={item.ratingImageAlt || ''} onChange={(e) => updateItem(idx, { ratingImageAlt: e.target.value })} placeholder="e.g. 5 star rating" />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Testimonial
      </Button>
    </div>
  );
}

function TestimonialsShowcaseFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'testimonials-showcase' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const updateItem = (index: number, updates: Partial<typeof block.items[number]>) => {
    const items = [...block.items];
    items[index] = { ...items[index], ...updates };
    onUpdate({ items });
  };
  const updateReviewLink = (index: number, updates: Partial<typeof block.reviewLinks[number]>) => {
    const reviewLinks = [...block.reviewLinks];
    reviewLinks[index] = { ...reviewLinks[index], ...updates };
    onUpdate({ reviewLinks });
  };

  return (
    <div className="space-y-6">
      <div><Label>Section Label</Label><Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} /></div>
      <div><Label>Heading</Label><Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} /></div>
      <div><Label>Description</Label><RichTextEditor value={block.description} onChange={(description) => onUpdate({ description })} /></div>
      <div className="space-y-3 border-t pt-5">
        <Label className="font-semibold">Testimonials</Label>
        {block.items.map((item, index) => (
          <div key={index} className="space-y-3 rounded-lg border bg-gray-50 p-4">
            <div className="flex items-center justify-between"><span className="text-sm font-medium">Testimonial {index + 1}</span><Button variant="ghost" size="sm" onClick={() => onUpdate({ items: block.items.filter((_, i) => i !== index) })} className="h-8 w-8 p-0 text-red-500"><Trash2 className="h-4 w-4" /></Button></div>
            <Textarea value={item.text} onChange={(e) => updateItem(index, { text: e.target.value })} rows={5} placeholder="Testimonial quote" />
            <div className="grid gap-3 md:grid-cols-2"><Input value={item.author} onChange={(e) => updateItem(index, { author: e.target.value })} placeholder="Attribution" /><Input value={item.category} onChange={(e) => updateItem(index, { category: e.target.value })} placeholder="Matter type" /></div>
          </div>
        ))}
        <Button variant="outline" onClick={() => onUpdate({ items: [...block.items, { text: 'New testimonial', author: 'Client', category: 'Legal Services' }] })} className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Testimonial</Button>
      </div>
      <div className="space-y-3 border-t pt-5">
        <Label className="font-semibold">External Review Links</Label>
        {block.reviewLinks.map((reviewLink, index) => (
          <div key={index} className="flex items-center gap-3 rounded-lg border bg-gray-50 p-4">
            <Input value={reviewLink.label} onChange={(e) => updateReviewLink(index, { label: e.target.value })} placeholder="Platform" />
            <Input value={reviewLink.url} onChange={(e) => updateReviewLink(index, { url: e.target.value })} placeholder="https://..." />
            <Button variant="ghost" size="sm" onClick={() => onUpdate({ reviewLinks: block.reviewLinks.filter((_, i) => i !== index) })} className="h-8 w-8 shrink-0 p-0 text-red-500"><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => onUpdate({ reviewLinks: [...block.reviewLinks, { label: 'Review Platform', url: 'https://' }] })} className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Review Link</Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Section Fields                                             */
/* ------------------------------------------------------------------ */
function ContactSectionFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'contact-section' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Label</Label>
        <Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} />
      </div>
      <div>
        <Label>Heading</Label>
        <Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={block.description} onChange={(e) => onUpdate({ description: e.target.value })} rows={3} />
      </div>
      <div>
        <Label>Form Heading</Label>
        <Input value={block.formHeading} onChange={(e) => onUpdate({ formHeading: e.target.value })} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Map Fields                                                         */
/* ------------------------------------------------------------------ */
function MapFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'map' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} placeholder="Our Location" />
      </div>
      <div>
        <Label>Subtext</Label>
        <Input value={block.subtext || ''} onChange={(e) => onUpdate({ subtext: e.target.value })} placeholder="Optional description" />
      </div>
      <div>
        <Label>Google Maps Embed URL</Label>
        <Input value={block.mapEmbedUrl} onChange={(e) => onUpdate({ mapEmbedUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?..." />
        <p className="text-xs text-gray-400 mt-1">Paste the embed URL from Google Maps (Share → Embed a map → copy the src URL)</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Practice Areas Grid Fields                                         */
/* ------------------------------------------------------------------ */
function PracticeAreasGridFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'practice-areas-grid' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const updateArea = (idx: number, updates: Partial<typeof block.areas[0]>) => {
    const newAreas = [...block.areas];
    newAreas[idx] = { ...newAreas[idx], ...updates };
    onUpdate({ areas: newAreas });
  };

  const addArea = () => {
    onUpdate({ areas: [...block.areas, { icon: 'Scale', title: 'New Area', description: 'Description', image: '/placeholder.svg', imageAlt: '', link: '/contact' }] });
  };

  const removeArea = (idx: number) => {
    onUpdate({ areas: block.areas.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={block.description || ''} onChange={(e) => onUpdate({ description: e.target.value })} rows={2} />
      </div>

      <Label className="font-semibold">Practice Areas</Label>
      {block.areas.map((area, idx) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Area {idx + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeArea(idx)} className="text-red-500 h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Icon</Label>
            <Select value={area.icon} onValueChange={(v) => updateArea(idx, { icon: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {ICON_OPTIONS.map((icon) => (
                  <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Title</Label>
            <Input value={area.title} onChange={(e) => updateArea(idx, { title: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Description</Label>
            <Textarea value={area.description} onChange={(e) => updateArea(idx, { description: e.target.value })} rows={2} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Image URL</Label>
            <Input value={area.image} onChange={(e) => updateArea(idx, { image: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Image Alt Text</Label>
            <Input value={area.imageAlt || ''} onChange={(e) => updateArea(idx, { imageAlt: e.target.value })} placeholder="Describe the background image" />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Link</Label>
            <Input value={area.link} onChange={(e) => updateArea(idx, { link: e.target.value })} placeholder="/practice-areas/..." />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addArea} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Area
      </Button>
    </div>
  );
}

function LocationsHubFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'locations-hub' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  const updateOffice = (index: number, updates: Partial<typeof block.offices[number]>) => {
    const offices = [...block.offices];
    offices[index] = { ...offices[index], ...updates };
    onUpdate({ offices });
  };

  const updateRegion = (index: number, updates: Partial<typeof block.regions[number]>) => {
    const regions = [...block.regions];
    regions[index] = { ...regions[index], ...updates };
    onUpdate({ regions });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Section Label</Label><Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} /></div>
        <div><Label>Main Heading</Label><Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} /></div>
      </div>
      <div><Label>Introduction</Label><RichTextEditor value={block.description} onChange={(description) => onUpdate({ description })} minHeight="160px" /></div>

      <div className="space-y-3 border-t pt-5">
        <Label className="font-semibold">Office Network</Label>
        <Input value={block.officesHeading} onChange={(e) => onUpdate({ officesHeading: e.target.value })} placeholder="Office section heading" />
        {block.offices.map((office, index) => (
          <div key={index} className="space-y-3 rounded-lg border bg-gray-50 p-4">
            <div className="flex items-center justify-between"><span className="text-sm font-medium">Office {index + 1}</span><Button variant="ghost" size="sm" onClick={() => onUpdate({ offices: block.offices.filter((_, i) => i !== index) })} className="h-8 w-8 p-0 text-red-500"><Trash2 className="h-4 w-4" /></Button></div>
            <div className="grid gap-3 md:grid-cols-2"><Input value={office.city} onChange={(e) => updateOffice(index, { city: e.target.value })} placeholder="City" /><Input value={office.state} onChange={(e) => updateOffice(index, { state: e.target.value })} placeholder="State" /></div>
            <Textarea value={office.address} onChange={(e) => updateOffice(index, { address: e.target.value })} placeholder="Street address" rows={2} />
            <Input value={office.link || ''} onChange={(e) => updateOffice(index, { link: e.target.value })} placeholder="Optional page link" />
          </div>
        ))}
        <Button variant="outline" onClick={() => onUpdate({ offices: [...block.offices, { city: 'New Office', state: '', address: '', link: '' }] })} className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Office</Button>
      </div>

      <div className="space-y-3 border-t pt-5">
        <Label className="font-semibold">Primary Service Locations</Label>
        <Input value={block.primaryHeading} onChange={(e) => onUpdate({ primaryHeading: e.target.value })} placeholder="Section heading" />
        <Textarea
          value={block.primaryLocations.map((location) => `${location.name}|${location.link || ''}`).join('\n')}
          onChange={(e) => onUpdate({ primaryLocations: e.target.value.split('\n').filter(Boolean).map((line) => { const [name, link = ''] = line.split('|'); return { name: name.trim(), link: link.trim() }; }) })}
          rows={8}
          placeholder="Location name|/optional-link/ (one per line)"
        />
      </div>

      <div className="space-y-3 border-t pt-5">
        <Label className="font-semibold">Regional Coverage</Label>
        <Input value={block.coverageHeading} onChange={(e) => onUpdate({ coverageHeading: e.target.value })} placeholder="Coverage heading" />
        <RichTextEditor value={block.coverageDescription} onChange={(coverageDescription) => onUpdate({ coverageDescription })} />
        {block.regions.map((region, index) => (
          <div key={index} className="space-y-3 rounded-lg border bg-gray-50 p-4">
            <div className="flex items-center justify-between"><span className="text-sm font-medium">Region {index + 1}</span><Button variant="ghost" size="sm" onClick={() => onUpdate({ regions: block.regions.filter((_, i) => i !== index) })} className="h-8 w-8 p-0 text-red-500"><Trash2 className="h-4 w-4" /></Button></div>
            <Input value={region.name} onChange={(e) => updateRegion(index, { name: e.target.value })} placeholder="Region name" />
            <Textarea value={region.locations.join('\n')} onChange={(e) => updateRegion(index, { locations: e.target.value.split('\n').map((item) => item.trim()).filter(Boolean) })} rows={6} placeholder="One county or community per line" />
          </div>
        ))}
        <Button variant="outline" onClick={() => onUpdate({ regions: [...block.regions, { name: 'New Region', locations: [] }] })} className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Region</Button>
      </div>

      <div className="space-y-3 border-t pt-5">
        <Label className="font-semibold">Legal Services</Label>
        <Input value={block.servicesHeading} onChange={(e) => onUpdate({ servicesHeading: e.target.value })} placeholder="Services heading" />
        <Textarea
          value={block.services.map((service) => `${service.title}|${service.link}|${service.icon}`).join('\n')}
          onChange={(e) => onUpdate({ services: e.target.value.split('\n').filter(Boolean).map((line) => { const [title, link = '', icon = 'Scale'] = line.split('|'); return { title: title.trim(), link: link.trim(), icon: icon.trim() }; }) })}
          rows={6}
          placeholder="Service title|/link/|Icon (one per line)"
        />
        <p className="text-xs text-gray-500">Available icons: Shield, HeartHandshake, Scale, Car, FileSearch</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recent Posts Fields                                                 */
/* ------------------------------------------------------------------ */
function RecentPostsFields({ block, onUpdate }: { block: Extract<ContentBlock, { type: 'recent-posts' }>; onUpdate: (u: Partial<ContentBlock>) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
        This section dynamically displays your most recent published blog posts.
      </div>
      <div>
        <Label>Section Label</Label>
        <Input value={block.sectionLabel} onChange={(e) => onUpdate({ sectionLabel: e.target.value })} />
      </div>
      <div>
        <Label>Heading</Label>
        <Input value={block.heading} onChange={(e) => onUpdate({ heading: e.target.value })} />
      </div>
      <div>
        <Label>Number of Posts</Label>
        <Input type="number" min={1} max={12} value={block.postCount ?? 6} onChange={(e) => onUpdate({ postCount: Number(e.target.value) })} />
      </div>
    </div>
  );
}
