import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

export const SectionContent: ExtendedReactFunctionalComponent = ({
  children
}) => {
  return (
    <section className="p-4 rounded-2">
      {children}
    </section>
  )
}