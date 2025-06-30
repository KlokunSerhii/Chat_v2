import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import styled from 'styled-components';

export const StyledLink = styled.a`
  color: #1a73e8;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: #0c47a1;
    text-decoration: none;
  }
`;
const Wrapper = styled.div`
  margin-block-start: 0;
  text-align: start;
`;

const MarkdownRenderer = ({ content }) => {
  return (
    <Wrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          a: ({ href, children, ...props }) => (
            <StyledLink href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </StyledLink>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Wrapper>
  );
};

export default MarkdownRenderer;
