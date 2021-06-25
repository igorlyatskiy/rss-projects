import React from "react";
import { Color } from "../../Constants";

export default class KnightSVG extends React.PureComponent<Color> {
  render() {
    const { color } = this.props;
    return (
      <svg
        width='46'
        height='78'
        viewBox='0 0 46 78'
        xmlns='http://www.w3.org/2000/svg'
      >
        <mask id='a' fill='white'>
          <path d='m18.07 1.8175c-1.6265 3.0039-1.6011 2.9787-3.3547 2.9787-1.474 0-1.5248 0.02524-1.9315 0.85825-0.2795 0.60584-1.1944 1.4136-3.0243 2.6758-1.4486 1.0097-2.7448 1.969-2.8972 2.1456-0.15249 0.2019-0.50829 1.4388-0.78785 2.802-0.27955 1.3378-0.96574 3.5845-1.4994 4.9476-0.55912 1.3883-1.0166 2.6757-1.0166 2.8524s0.3558 1.3884 0.78785 2.701c0.73701 2.1961 0.76243 2.4991 0.63536 4.8971-0.15249 2.4991-0.15249 2.6 0.76243 4.9224 1.0166 2.6 1.0928 3.4583 0.60994 6.9166-0.25414 1.7922-0.22873 2.2718 0.20332 4.0388 0.30497 1.2369 0.45745 2.5243 0.38121 3.2816l-0.12707 1.2621 1.1691 0.7068c1.6011 0.9845 3.6089 2.8272 3.7868 3.4583 0.1524 0.5554-0.4321 1.5146-2.2619 3.736-0.60994 0.732-1.1182 1.565-1.1182 1.8175 0 0.9087-0.33039 1.3126-2.0586 2.4233-4.0155 2.6252-6.3282 7.5981-4.6254 9.8952l0.55912 0.7573-1.1182 0.934c-0.88951 0.7068-1.1436 1.0854-1.1436 1.666 0 1.2369 0.43204 1.6913 1.8552 2.0952 5.7182 1.6155 28.312 1.9184 38.731 0.5301 4.4984-0.6059 5.4133-1.0602 5.4133-2.6758 0-0.732-0.1525-1.0854-0.7624-1.5651-0.4067-0.3534-0.8895-0.6815-1.0674-0.732-0.2542-0.101-0.1779-0.4039 0.2795-1.2117 0.4829-0.8835 0.5846-1.3126 0.4575-2.4233-0.2796-2.6-2.389-5.5787-5.3879-7.5728-1.1944-0.8078-1.5248-1.1865-1.779-2.0195-0.1525-0.5553-1.0165-1.8932-1.8552-2.9786-0.8641-1.0602-1.5757-2.1204-1.5757-2.3476s0.6099-1.0097 1.3724-1.7165c2.0839-2.0195 2.3127-2.4486 2.2873-4.5185-0.0255-1.3127-0.2542-2.4486-0.8387-4.1903-1.5503-4.569-3.2022-7.0681-8.6663-13.126-2.6431-2.9029-4.905-6.0835-5.8453-8.1282-0.5083-1.1107-0.737-4.2408-0.305-4.2408 0.1271 0 0.4829 0.3029 0.8387 0.6563 1.1182 1.2117 2.0586 1.4389 5.8199 1.3884l3.4055-0.0252 1.0928 0.7572c1.9315 1.3884 4.7271 1.9942 7.3194 1.5903 0.9657-0.1514 1.3215-0.3534 1.5756-0.833 0.3813-0.7825 0.2542-0.934-1.9569-2.1709-1.4486-0.7825-1.5502-0.8835-0.7624-0.732 0.4829 0.0757 1.3216 0.2019 1.8807 0.3029l0.9911 0.1515-0.127-2.1962c-0.1017-1.9689-0.1779-2.2466-0.8387-2.9281-0.9149-0.9593-3.5326-2.2719-4.4729-2.2719-0.9912 0-4.7779-1.9942-7.4719-3.9379-3.3547-2.3981-3.99-2.701-6.3536-2.8272-1.1182-0.05049-2.1602-0.20194-2.3127-0.32817-0.1779-0.12621-0.5591-1.1359-0.8895-2.2466-0.3049-1.1107-0.6607-2.0194-0.7878-2.0194-0.1017 0-0.6354 0.83302-1.1945 1.8175z' />
        </mask>
        <path
          d='m18.07 1.8175c-1.6265 3.0039-1.6011 2.9787-3.3547 2.9787-1.474 0-1.5248 0.02524-1.9315 0.85825-0.2795 0.60584-1.1944 1.4136-3.0243 2.6758-1.4486 1.0097-2.7448 1.969-2.8972 2.1456-0.15249 0.2019-0.50829 1.4388-0.78785 2.802-0.27955 1.3378-0.96574 3.5845-1.4994 4.9476-0.55912 1.3883-1.0166 2.6757-1.0166 2.8524s0.3558 1.3884 0.78785 2.701c0.73701 2.1961 0.76243 2.4991 0.63536 4.8971-0.15249 2.4991-0.15249 2.6 0.76243 4.9224 1.0166 2.6 1.0928 3.4583 0.60994 6.9166-0.25414 1.7922-0.22873 2.2718 0.20332 4.0388 0.30497 1.2369 0.45745 2.5243 0.38121 3.2816l-0.12707 1.2621 1.1691 0.7068c1.6011 0.9845 3.6089 2.8272 3.7868 3.4583 0.1524 0.5554-0.4321 1.5146-2.2619 3.736-0.60994 0.732-1.1182 1.565-1.1182 1.8175 0 0.9087-0.33039 1.3126-2.0586 2.4233-4.0155 2.6252-6.3282 7.5981-4.6254 9.8952l0.55912 0.7573-1.1182 0.934c-0.88951 0.7068-1.1436 1.0854-1.1436 1.666 0 1.2369 0.43204 1.6913 1.8552 2.0952 5.7182 1.6155 28.312 1.9184 38.731 0.5301 4.4984-0.6059 5.4133-1.0602 5.4133-2.6758 0-0.732-0.1525-1.0854-0.7624-1.5651-0.4067-0.3534-0.8895-0.6815-1.0674-0.732-0.2542-0.101-0.1779-0.4039 0.2795-1.2117 0.4829-0.8835 0.5846-1.3126 0.4575-2.4233-0.2796-2.6-2.389-5.5787-5.3879-7.5728-1.1944-0.8078-1.5248-1.1865-1.779-2.0195-0.1525-0.5553-1.0165-1.8932-1.8552-2.9786-0.8641-1.0602-1.5757-2.1204-1.5757-2.3476s0.6099-1.0097 1.3724-1.7165c2.0839-2.0195 2.3127-2.4486 2.2873-4.5185-0.0255-1.3127-0.2542-2.4486-0.8387-4.1903-1.5503-4.569-3.2022-7.0681-8.6663-13.126-2.6431-2.9029-4.905-6.0835-5.8453-8.1282-0.5083-1.1107-0.737-4.2408-0.305-4.2408 0.1271 0 0.4829 0.3029 0.8387 0.6563 1.1182 1.2117 2.0586 1.4389 5.8199 1.3884l3.4055-0.0252 1.0928 0.7572c1.9315 1.3884 4.7271 1.9942 7.3194 1.5903 0.9657-0.1514 1.3215-0.3534 1.5756-0.833 0.3813-0.7825 0.2542-0.934-1.9569-2.1709-1.4486-0.7825-1.5502-0.8835-0.7624-0.732 0.4829 0.0757 1.3216 0.2019 1.8807 0.3029l0.9911 0.1515-0.127-2.1962c-0.1017-1.9689-0.1779-2.2466-0.8387-2.9281-0.9149-0.9593-3.5326-2.2719-4.4729-2.2719-0.9912 0-4.7779-1.9942-7.4719-3.9379-3.3547-2.3981-3.99-2.701-6.3536-2.8272-1.1182-0.05049-2.1602-0.20194-2.3127-0.32817-0.1779-0.12621-0.5591-1.1359-0.8895-2.2466-0.3049-1.1107-0.6607-2.0194-0.7878-2.0194-0.1017 0-0.6354 0.83302-1.1945 1.8175z'
          fill={color === "white" ? "#F0F7F4" : "#40B3A2"}
          stroke='#E27D5F'
          mask='url(#a)'
          strokeWidth='2'
        />
      </svg>
    );
  }
}
