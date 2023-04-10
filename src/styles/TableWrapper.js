import styled from "styled-components";

export const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #4caf50;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  input,
  textarea {
    width: 100%;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
  }

  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      background-color: ${(props) => (props.loading ? "red" : "#ddd")};
      cursor: not-allowed;
    }
  }
`;
