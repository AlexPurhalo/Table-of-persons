import { TableCell } from "./TableCell";

export const NewPersonRow = ({ values, loading, onInputChange, onAddNew }) => (
  <tr>
    <td>---</td>
    <td>
      <TableCell
        editing={true}
        value={values.name}
        onChange={(e) => onInputChange(e, "name")}
        loading={loading}
      />
    </td>
    <td>
      <TableCell
        editing={true}
        value={values.age}
        onChange={(e) => onInputChange(e, "age")}
        loading={loading}
      />
    </td>
    <td>
      <TableCell
        editing={true}
        value={values.about}
        onChange={(e) => onInputChange(e, "about")}
        loading={loading}
      />
    </td>
    <td>
      <button onClick={() => onAddNew()} disabled={loading}>
        Add
      </button>
    </td>
    <td></td>
  </tr>
);
