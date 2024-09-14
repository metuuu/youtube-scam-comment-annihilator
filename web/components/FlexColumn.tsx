import React, { ElementType, PropsWithChildren } from 'react'

const FlexColumn = <TAs extends ElementType = 'div'>(
  props: PropsWithChildren<
    {
      as?: TAs
      ref?: React.LegacyRef<HTMLDivElement>
      gap?: number
      style?: React.CSSProperties
      reverse?: boolean
    } & Pick<React.CSSProperties, 'alignContent' | 'alignItems' | 'justifyContent' | 'gap'> &
      React.ComponentPropsWithoutRef<TAs> // Add props of the `as` element
  >,
) => {
  const {
    as: Component = 'div',
    ref,
    position,
    reverse,
    justifyContent,
    alignContent,
    alignItems,
    gap,
    style,
    ...restProps
  } = props

  return (
    <Component
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        justifyContent,
        alignContent,
        alignItems,
        gap,
        ...style,
      }}
      {...restProps}
    />
  )
}

export default FlexColumn
