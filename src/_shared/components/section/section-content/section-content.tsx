import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

export const SectionContent: ExtendedReactFunctionalComponent = ({
  children
}) => {
  return (
    <section className="rounded-2">
      {children}
    </section>
  )
}