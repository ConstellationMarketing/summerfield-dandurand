import type { AreaServedPageContent } from "@site/lib/cms/areaServedPageTypes";
import { Section, ArrayEditor, ImageField, RichTextField, Input, Label } from "./EditorShared";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface AreaServedPageEditorProps {
  content: AreaServedPageContent;
  onChange: (content: AreaServedPageContent) => void;
}

export default function AreaServedPageEditor({ content, onChange }: AreaServedPageEditorProps) {
  const update = <K extends keyof AreaServedPageContent>(key: K, value: AreaServedPageContent[K]) => onChange({ ...content, [key]: value });

  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <div className="grid gap-4">
          <Field label="Page Title (H1)" value={content.hero.sectionLabel} onChange={(sectionLabel) => update("hero", { ...content.hero, sectionLabel })} />
          <Field label="Tagline" value={content.hero.tagline} onChange={(tagline) => update("hero", { ...content.hero, tagline })} />
          <RichTextField label="Description" value={content.hero.description} onChange={(description) => update("hero", { ...content.hero, description })} />
          <ImageField label="Background Image" value={content.hero.backgroundImage} altValue={content.hero.backgroundImageAlt} onChange={(backgroundImage) => update("hero", { ...content.hero, backgroundImage })} onAltChange={(backgroundImageAlt) => update("hero", { ...content.hero, backgroundImageAlt })} onSelectAsset={(asset) => update("hero", { ...content.hero, backgroundImage: asset.url, backgroundImageAlt: asset.suggestedAltText || content.hero.backgroundImageAlt })} folder="areas-served" />
        </div>
      </Section>

      <Section title="Awards and Social Proof" defaultOpen={false}>
        <div className="grid gap-4">
          <Label>Display awards and badges</Label>
          <Switch checked={content.socialProof.mode === "awards"} onCheckedChange={(checked) => update("socialProof", { ...content.socialProof, mode: checked ? "awards" : "none" })} />
          <ArrayEditor items={content.socialProof.awards.logos} onChange={(logos) => update("socialProof", { ...content.socialProof, awards: { logos } })} itemLabel="Award Logo" newItem={() => ({ src: "", alt: "" })} renderItem={(item, _, set) => <ImageField label="Logo" value={item.src} altValue={item.alt} onChange={(src) => set({ ...item, src })} onAltChange={(alt) => set({ ...item, alt })} onSelectAsset={(asset) => set({ src: asset.url, alt: asset.suggestedAltText || item.alt })} folder="logos" />} />
        </div>
      </Section>

      <Section title="Introduction">
        <div className="grid gap-4">
          <Field label="Section Label" value={content.intro.sectionLabel} onChange={(sectionLabel) => update("intro", { ...content.intro, sectionLabel })} />
          <Field label="Heading" value={content.intro.heading} onChange={(heading) => update("intro", { ...content.intro, heading })} />
          <RichTextField label="Body" value={content.intro.body} onChange={(body) => update("intro", { ...content.intro, body })} />
          <div className="grid gap-4 md:grid-cols-2"><Field label="Button Label" value={content.intro.buttonLabel} onChange={(buttonLabel) => update("intro", { ...content.intro, buttonLabel })} /><Field label="Button Link" value={content.intro.buttonLink} onChange={(buttonLink) => update("intro", { ...content.intro, buttonLink })} /></div>
          <Field label="Testimonial" value={content.intro.testimonial} onChange={(testimonial) => update("intro", { ...content.intro, testimonial })} />
          <Field label="Testimonial Attribution" value={content.intro.testimonialAuthor} onChange={(testimonialAuthor) => update("intro", { ...content.intro, testimonialAuthor })} />
        </div>
      </Section>

      <Section title="Primary Practice Focus">
        <div className="grid gap-4">
          <Field label="Section Label" value={content.focus.sectionLabel} onChange={(sectionLabel) => update("focus", { ...content.focus, sectionLabel })} />
          <Field label="Heading" value={content.focus.heading} onChange={(heading) => update("focus", { ...content.focus, heading })} />
          <ArrayEditor items={content.focus.items} onChange={(items) => update("focus", { ...content.focus, items })} itemLabel="Focus Area" newItem={() => ({ title: "New Focus", link: "/", icon: "Scale", description: "" })} renderItem={(item, _, set) => <div className="grid gap-3"><Field label="Title" value={item.title} onChange={(title) => set({ ...item, title })} /><Field label="Link" value={item.link} onChange={(link) => set({ ...item, link })} /><Field label="Icon (Shield, HeartHandshake, Scale, Car)" value={item.icon} onChange={(icon) => set({ ...item, icon })} /><Field label="Description" value={item.description} onChange={(description) => set({ ...item, description })} /></div>} />
        </div>
      </Section>

      <Section title="Practice Area Details">
        <div className="grid gap-4">
          <Field label="Section Label" value={content.practiceAreas.sectionLabel} onChange={(sectionLabel) => update("practiceAreas", { ...content.practiceAreas, sectionLabel })} />
          <Field label="Heading" value={content.practiceAreas.heading} onChange={(heading) => update("practiceAreas", { ...content.practiceAreas, heading })} />
          <ArrayEditor items={content.practiceAreas.items} onChange={(items) => update("practiceAreas", { ...content.practiceAreas, items })} itemLabel="Practice Area" newItem={() => ({ title: "New Practice Area", link: "/", tagline: "", body: "", casesHeading: "Cases We Handle", cases: [] })} renderItem={(item, _, set) => <div className="grid gap-3"><Field label="Title" value={item.title} onChange={(title) => set({ ...item, title })} /><Field label="Link" value={item.link} onChange={(link) => set({ ...item, link })} /><Field label="Tagline" value={item.tagline} onChange={(tagline) => set({ ...item, tagline })} /><RichTextField label="Body" value={item.body} onChange={(body) => set({ ...item, body })} /><Field label="Cases Heading" value={item.casesHeading} onChange={(casesHeading) => set({ ...item, casesHeading })} /><ArrayEditor items={item.cases} onChange={(cases) => set({ ...item, cases })} itemLabel="Case Type" newItem={() => ({ title: "New Case Type", link: "" })} renderItem={(caseItem, __, setCase) => <div className="grid gap-3 md:grid-cols-2"><Field label="Title" value={caseItem.title} onChange={(title) => setCase({ ...caseItem, title })} /><Field label="Optional Link" value={caseItem.link} onChange={(link) => setCase({ ...caseItem, link })} /></div>} /></div>} />
        </div>
      </Section>

      <Section title="Service Area Map">
        <div className="grid gap-4">
          <Field label="Section Label" value={content.serviceArea.sectionLabel} onChange={(sectionLabel) => update("serviceArea", { ...content.serviceArea, sectionLabel })} />
          <Field label="Heading" value={content.serviceArea.heading} onChange={(heading) => update("serviceArea", { ...content.serviceArea, heading })} />
          <RichTextField label="Body" value={content.serviceArea.body} onChange={(body) => update("serviceArea", { ...content.serviceArea, body })} />
          <ImageField label="County Map" value={content.serviceArea.mapImage} altValue={content.serviceArea.mapImageAlt} onChange={(mapImage) => update("serviceArea", { ...content.serviceArea, mapImage })} onAltChange={(mapImageAlt) => update("serviceArea", { ...content.serviceArea, mapImageAlt })} onSelectAsset={(asset) => update("serviceArea", { ...content.serviceArea, mapImage: asset.url, mapImageAlt: asset.suggestedAltText || content.serviceArea.mapImageAlt })} folder="areas-served" />
          <ArrayEditor items={content.serviceArea.cities} onChange={(cities) => update("serviceArea", { ...content.serviceArea, cities })} itemLabel="City" newItem={() => ({ title: "New City", link: "" })} renderItem={(item, _, set) => <div className="grid gap-3 md:grid-cols-2"><Field label="City" value={item.title} onChange={(title) => set({ ...item, title })} /><Field label="Optional Link" value={item.link} onChange={(link) => set({ ...item, link })} /></div>} />
        </div>
      </Section>

      <Section title="Firm Approach">
        <div className="grid gap-4">
          <Field label="Section Label" value={content.approach.sectionLabel} onChange={(sectionLabel) => update("approach", { ...content.approach, sectionLabel })} />
          <Field label="Heading" value={content.approach.heading} onChange={(heading) => update("approach", { ...content.approach, heading })} />
          <Field label="Tagline" value={content.approach.tagline} onChange={(tagline) => update("approach", { ...content.approach, tagline })} />
          <RichTextField label="Body" value={content.approach.body} onChange={(body) => update("approach", { ...content.approach, body })} />
          <div><Label>Commitments (one per line)</Label><Textarea value={content.approach.features.join("\n")} onChange={(event) => update("approach", { ...content.approach, features: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })} rows={7} /></div>
        </div>
      </Section>

      <Section title="Client Reviews" defaultOpen={false}>
        <div className="grid gap-4">
          <div className="flex items-center gap-3"><Switch checked={content.reviews.enabled} onCheckedChange={(enabled) => update("reviews", { ...content.reviews, enabled })} /><Label>Show reviews</Label></div>
          <Field label="Section Label" value={content.reviews.sectionLabel} onChange={(sectionLabel) => update("reviews", { ...content.reviews, sectionLabel })} />
          <Field label="Heading" value={content.reviews.heading} onChange={(heading) => update("reviews", { ...content.reviews, heading })} />
          <Field label="Review Badge Text" value={content.reviews.reviewBadgeText} onChange={(reviewBadgeText) => update("reviews", { ...content.reviews, reviewBadgeText })} />
          <ArrayEditor items={content.reviews.items} onChange={(items) => update("reviews", { ...content.reviews, items })} itemLabel="Review" newItem={() => ({ text: "", author: "", ratingImage: "", ratingImageAlt: "" })} renderItem={(item, _, set) => <div className="grid gap-3"><RichTextField label="Review" value={item.text} onChange={(text) => set({ ...item, text })} /><Field label="Author" value={item.author} onChange={(author) => set({ ...item, author })} /></div>} />
        </div>
      </Section>

      <Section title="FAQ" defaultOpen={false}>
        <div className="grid gap-4">
          <div className="flex items-center gap-3"><Switch checked={content.faq.enabled} onCheckedChange={(enabled) => update("faq", { ...content.faq, enabled })} /><Label>Show FAQ</Label></div>
          <Field label="Heading" value={content.faq.heading} onChange={(heading) => update("faq", { ...content.faq, heading })} />
          <RichTextField label="Description" value={content.faq.description} onChange={(description) => update("faq", { ...content.faq, description })} />
          <ArrayEditor items={content.faq.items} onChange={(items) => update("faq", { ...content.faq, items })} itemLabel="Question" newItem={() => ({ question: "", answer: "" })} renderItem={(item, _, set) => <div className="grid gap-3"><Field label="Question" value={item.question} onChange={(question) => set({ ...item, question })} /><RichTextField label="Answer" value={item.answer} onChange={(answer) => set({ ...item, answer })} /></div>} />
        </div>
      </Section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <div><Label>{label}</Label><Input value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}
