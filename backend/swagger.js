const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Exam Registration API",
    version: "1.0.0",
    description: "API documentation for managing students and exams",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
  paths: {
    "/api/students": {
      get: {
        tags: ["Student"],
        summary: "Get all students",
        responses: {
          200: {
            description: "List of students",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Student" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Student"],
        summary: "Create a new student",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Student" },
            },
          },
        },
        responses: {
          201: { description: "Student created successfully" },
          400: { description: "Validation error" },
        },
      },
    },

    "/api/students/{id}": {
      get: {
        tags: ["Student"],
        summary: "Get student by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Student found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Student" },
              },
            },
          },
          404: { description: "Student not found" },
        },
      },
      put: {
        tags: ["Student"],
        summary: "Update student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Student" },
            },
          },
        },
        responses: {
          200: { description: "Student updated successfully" },
          404: { description: "Student not found" },
        },
      },
      delete: {
        tags: ["Student"],
        summary: "Delete student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Student deleted successfully" },
          404: { description: "Student not found" },
        },
      },
    },

    "/api/students/{id}/calculate-score": {
      get: {
        tags: ["Student"],
        summary: "Calculate student's exam score",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Score calculated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Score calculated" },
                    studentId: { type: "string" },
                    score: { type: "number" },
                  },
                },
              },
            },
          },
          404: { description: "Student or Exam not found" },
        },
      },
    },

    "/api/exams": {
      get: {
        tags: ["Exam"],
        summary: "Get all exams",
        responses: {
          200: {
            description: "List of exams",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Exam" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Exam"],
        summary: "Create a new exam",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Exam" },
            },
          },
        },
        responses: {
          201: { description: "Exam created successfully" },
          400: { description: "Validation error" },
        },
      },
    },

    "/api/exams/{id}": {
      get: {
        tags: ["Exam"],
        summary: "Get exam by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Exam ID",
          },
        ],
        responses: {
          200: {
            description: "Exam found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Exam" },
              },
            },
          },
          404: { description: "Exam not found" },
        },
      },
      put: {
        tags: ["Exam"],
        summary: "Update exam",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Exam" },
            },
          },
        },
        responses: {
          200: { description: "Exam updated successfully" },
          404: { description: "Exam not found" },
        },
      },
      delete: {
        tags: ["Exam"],
        summary: "Delete exam",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Exam deleted successfully" },
          404: { description: "Exam not found" },
        },
      },
    },
  },

  components: {
    schemas: {
      Student: {
        type: "object",
        required: ["name", "code", "email", "exam"],
        properties: {
          name: { type: "string", example: "Бат-Эрдэнэ" },
          code: { type: "string", example: "B231890063" },
          email: { type: "string", example: "bat_erdene@mail.com" },
          exam: { type: "string", example: "663079c1a9d7dd2cf0542827" }, // ObjectId
          score: { type: "number", example: 95 },
        },
      },
      Exam: {
        type: "object",
        required: ["name", "duration", "questions"],
        properties: {
          name: { type: "string", example: "Math" },
          duration: {
            type: "object",
            properties: {
              hour: { type: "number", example: 1 },
              minute: { type: "number", example: 30 },
            },
          },
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string", example: "What is 2 + 2?" },
                type: { type: "string", example: "input" },
                correct: {
                  oneOf: [
                    { type: "string", example: "4" },
                    {
                      type: "array",
                      items: { type: "number" },
                      example: [0, 2],
                    },
                  ],
                },
                score: { type: "number", example: 10 },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
