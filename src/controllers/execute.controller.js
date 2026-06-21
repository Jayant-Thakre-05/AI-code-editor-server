import axios from "axios";

export const executeCode = async (
  req,
  res
) => {
  try {
    const {
      source_code,
      language_id,
      stdin,
    } = req.body;

    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        source_code,
        language_id,
        stdin: stdin || "",
      }
    );

    const result = response.data;

    res.json({
      success: true,
      output:
        result.stdout ||
        result.stderr ||
        result.compile_output ||
        "No Output",
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.response?.data ||
        error.message,
    });
  }
};