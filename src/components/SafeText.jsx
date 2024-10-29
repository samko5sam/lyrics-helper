import { Fragment } from "react"

/* eslint-disable react/prop-types */
export const SafeText = ({content}) => {
  return (
    <div>
      {content.split(/\n/).map((line, i) => <Fragment key={i}>{line}<br/></Fragment>)}
    </div>
  )
}
