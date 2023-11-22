import axios, { AxiosInstance } from "axios";
import { workspace } from "vscode";

export async function postCompletion(fimPrefixCode: string, type: string): Promise<CompletionResponse> {
  const serverAddress = "http://localhost:8899/codeinterpreter"; // 修改为你的请求地址
  let maxtokens = workspace.getConfiguration("CodeOracle").get("CompletionMaxTokens") as number;
  const jsonData = {
    type: type,
    code: fimPrefixCode
  };
  console.debug("request.data:", jsonData)
  try {
    const response = await axios.post(serverAddress, jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.data.type === "code") {
      const completedCode = response.data.result[0].generation;
      return {
        completedCode: completedCode,
        isCompleted: true
      };
    } else {
      console.error('Received error response:', response.data.error);
      return {
        completedCode: "",
        isCompleted: false
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      completedCode: "",
      isCompleted: false
    };
  }
}

const axiosInstance: AxiosInstance = axios.create({
  timeout: 60000,
  timeoutErrorMessage: "请求超时"
});