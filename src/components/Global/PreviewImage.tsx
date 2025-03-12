import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined
} from "@ant-design/icons";
import { Image, Space } from "antd";



interface PreviewImageProps {
    image: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
    }

const PreviewImage = ({image,alt,width=200,className,height}:PreviewImageProps) => {

  const onDownload = () => {
    const url = image;
    const suffix = url.slice(url.lastIndexOf("."));
    const filename = Date.now() + suffix;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(blobUrl);
        link.remove();
      });
  };
  return (
    <Image.PreviewGroup
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: {
              onActive,
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
              onReset,
            },
          }
        ) => (
          <Space size={12} className="toolbar-wrapper">
            {/* <LeftOutlined onClick={() => onActive?.(-1)} />
            <RightOutlined onClick={() => onActive?.(1)} /> */}
            <DownloadOutlined onClick={onDownload} />
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
            <UndoOutlined onClick={onReset} />
          </Space>
        ),
        // onChange: (index) => {
        //   setCurrent(index);
        // },
      }}
    >
        <Image  src={image} width={width} alt={alt} className={className} />
    </Image.PreviewGroup>
  );
};
export default PreviewImage;
