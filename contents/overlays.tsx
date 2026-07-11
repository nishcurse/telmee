import cssText from "data-text:~/style.css"
import useClickEvents from "./hooks/useOutsideClick"
import useOverlayEvents from "./hooks/useOverlayEvents"
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
import  DictionaryCard  from "./pop-upCard"
import  OverlayButton  from "./overlayButton"

const overlays = () => {
  useOverlayEvents(); 
  useClickEvents();
  return (
    <>
      <OverlayButton />
      <DictionaryCard />
    </>
  )
}
export default overlays;