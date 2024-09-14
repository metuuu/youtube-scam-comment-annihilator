import React, { ElementType, PropsWithChildren } from 'react'

const FlexRow = <TAs extends ElementType = 'div'>(
  props: PropsWithChildren<
    {
      as?: TAs
      ref?: React.LegacyRef<HTMLDivElement>
      gap?: number
      style?: React.CSSProperties
      wrap?: boolean
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
    style,
    justifyContent,
    alignContent,
    alignItems,
    gap,
    wrap,
    ...restProps
  } = props

  return (
    <Component
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        justifyContent,
        alignContent,
        alignItems,
        gap,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...restProps}
    />
  )
}

export default FlexRow
