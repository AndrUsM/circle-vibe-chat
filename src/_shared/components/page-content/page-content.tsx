import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

export const PageContent: ExtendedReactFunctionalComponent = ({ children }) => {
  return (
    <section className="p-2 bg-light">
      {children}
    </section>
  )
}