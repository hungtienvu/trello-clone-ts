import styled from "styled-components"

type DragPreviewContainerProps = {
  isHidden?: boolean
  isPreview?: boolean
}

type DragPreviewWrapperProps = {
  position: {
    x: number
    y: number
  }
}

export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => ({
    style: {
      transform: `translate(${x}px, ${y}px)`
    }
  })
)<DragPreviewWrapperProps>``

export const ColumnContainer = styled.div`
  width: 300px;
  min-height: 40px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 300px;
`

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`

export const CardContainer = styled.div`
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
  display: flex;
  justify-content: space-between;
`


export const TaskCheckbox = styled.input.attrs({type: 'checkbox'})`

`

type AddItemButtonProps = {
  dark?: boolean
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${props => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px; 
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`

export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  pointer-events: none;
  width: 100%;
  z-index: 100;
  left:0;
  top:0;
  position:fixed;
`
