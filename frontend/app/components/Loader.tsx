import {Blocks} from "react-loader-spinner";

const Loader = () => {
  return <Blocks
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      visible={true}
  />
}
export default Loader;