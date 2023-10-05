import { useEffect, useRef, useState } from 'react';
import { getContent } from '../../../utils/api/contentApi';

const useGetContent = (endpoint) => {
  const contentRef = useRef(null);
  const [content, setContent] = useState(null);
  useEffect(() => {
    if (!contentRef.current) {
      getContent(endpoint).then((resp) => {
        setContent(resp.data);
        contentRef.current = resp.data;
      });
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { content: content || contentRef.current };
};

export default useGetContent;
