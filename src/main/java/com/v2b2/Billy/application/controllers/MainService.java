package com.v2b2.Billy.application.controllers;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.util.Objects;

@Service
@Transactional
public class MainService {
    public void create(String id, String info) {
        boolean succes = false;
        String path = "src\\main\\java\\com\\v2b2\\Billy\\application\\controllers\\files\\" + id + ".txt";
        try {
            File newFile = new File(path);
            if (newFile.createNewFile()) {
                succes = true;
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        if (succes) {
            try {
                FileWriter myWriter = new FileWriter(path);
                myWriter.write(info);
                myWriter.close();
            } catch (IOException e) {
                System.out.println("An error occurred.");
                e.printStackTrace();
            }
        }
    }

    public String getFile(String id) throws IOException {
//        ClassLoader classLoader = getClass().getClassLoader();
//        try {
//            return Objects.requireNonNull(classLoader.getResource("src/main/java/com/v2b2/Billy/application/controllers/files/test.txt")).getFile();
//        } catch (NullPointerException e) {
//            return "Not found";
//        }
        Class clazz = MainService.class;
        InputStream inputStream = clazz.getResourceAsStream("\\files\\test.txt");
        return readFromInputStream(inputStream);
    }

    private String readFromInputStream(InputStream inputStream)
            throws IOException {
        StringBuilder resultStringBuilder = new StringBuilder();
        try (BufferedReader br
                     = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = br.readLine()) != null) {
                resultStringBuilder.append(line).append("\n");
            }
        }
        return resultStringBuilder.toString();
    }
}
