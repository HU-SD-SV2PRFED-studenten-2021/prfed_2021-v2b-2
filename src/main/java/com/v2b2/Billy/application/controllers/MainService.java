package com.v2b2.Billy.application.controllers;

import com.v2b2.Billy.application.data.*;
import com.v2b2.Billy.application.dto.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class MainService {
    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final HistoryRepository historyRepository;

    public MainService(ArticleRepository articleRepository, CategoryRepository categoryRepository, SubcategoryRepository subcategoryRepository, HistoryRepository historyRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.historyRepository = historyRepository;
    }

    public ArticleDTO getArticle(String id) {
        Article a = this.articleRepository.findArticleByTitle(id);
        if (a != null) {
            return new ArticleDTO(a);
        } else return null;
    }

    public void insertFirst() {
        if (this.categoryRepository.findAllByName("Software") == null) {
            ArrayList<String> categories = new ArrayList<>();
            categories.add("Software");
            categories.add("Gebruikersinteractie");
            categories.add("Organisatieprocessen");
            categories.add("Infrastructuur");
            categories.add("Hardware interfacing");
            categories.add("Standaardpagina");
            ArrayList<Category> actualCategories = new ArrayList<>();
            categories.forEach(category -> {
                Category category1 = new Category();
                category1.setName(category);
                category1.setCategory_id(this.categoryRepository.getId().orElse(0) + 1);
                this.categoryRepository.saveAndFlush(category1);
                actualCategories.add(category1);
            });

            ArrayList<String> subCats = new ArrayList<>();
            subCats.add("Analyseren");
            subCats.add("Adviseren");
            subCats.add("Ontwerpen");
            subCats.add("Realiseren");
            subCats.add("Manage and control");
            subCats.add("Standaardpagina");
            ArrayList<Subcategory> actualSubCats = new ArrayList<>();
            subCats.forEach(category -> {
                Subcategory category1 = new Subcategory();
                category1.setName(category);
                category1.setSubcategory_id(this.subcategoryRepository.getId().orElse(0) + 1);
                this.subcategoryRepository.saveAndFlush(category1);
                actualSubCats.add(category1);
            });
            Article a = new Article();
            a.setTitle("index");
            a.setContent("<p>Welkom op Billy!</p>");
            a.setLastEdited(LocalDateTime.now());
            a.setCategory(actualCategories.get(5));
            a.setSubcategory(actualSubCats.get(5));
            this.articleRepository.save(a);

            Article b = new Article();
            b.setTitle("privacy");
            b.setContent("<p>Privacy is belangrijk en we hechten er veel waarde aan.<br>Daarom zullen we nooit je gegevens delen of verkopen aan een derde partij.</p>");
            b.setLastEdited(LocalDateTime.now());
            b.setCategory(actualCategories.get(5));
            b.setSubcategory(actualSubCats.get(5));
            this.articleRepository.save(b);

            Article d = new Article();
            d.setTitle("over");
            d.setContent("<p>Billy is een digitale boekenkast voor leerlingen aan HBO-i opleidingen.<br>Deze boekenkast is gemaakt door V2B-2.</p>");
            d.setLastEdited(LocalDateTime.now());
            d.setCategory(actualCategories.get(5));
            d.setSubcategory(actualSubCats.get(5));
            this.articleRepository.save(d);

            Article e = new Article();
            e.setTitle("voorbehoud");
            e.setContent("<p>De informatie op Billy is geschreven voor en door studenten. <br>Er kunnen geen rechten aan ontleent worden en informatie kan ten aller tijden verwijdert of veranderd worden.</p>");
            e.setLastEdited(LocalDateTime.now());
            e.setCategory(actualCategories.get(5));
            e.setSubcategory(actualSubCats.get(5));
            this.articleRepository.save(e);

            Article f = new Article();
            f.setTitle("lorem ipsum");
            f.setContent("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar fermentum mauris, a vehicula enim bibendum in. Quisque sed molestie nunc. Duis posuere pretium lorem, sed efficitur diam. Nullam sed enim vitae arcu laoreet malesuada. Mauris tempor, dolor a lobortis dignissim, dolor elit facilisis diam, nec suscipit metus dui in mauris. Cras metus mi, finibus a efficitur placerat, rutrum vel metus. Sed fringilla quis risus eu sagittis. Phasellus mauris magna, sodales id pulvinar ac, venenatis ac ligula. In hac habitasse platea dictumst. Nulla egestas urna vitae nisl tristique, sed aliquam justo fringilla. Praesent ut justo gravida, faucibus ante sit amet, vestibulum turpis.\n" +
                    "\n" +
                    "Vivamus non elementum dui, vitae fringilla nibh. Pellentesque molestie leo ac interdum molestie. In a tortor mattis, eleifend felis ultricies, viverra risus. Donec rhoncus augue purus, ut consectetur arcu blandit non. Cras sed tincidunt ipsum, ut viverra arcu. Cras interdum, sapien in fermentum pharetra, lectus ex mollis nisl, in euismod libero turpis at turpis. Curabitur at enim in tortor sodales finibus convallis nec turpis. Maecenas in nibh pretium, gravida ligula sed, mattis nibh. Nulla rhoncus tempor quam vitae posuere.\n" +
                    "\n" +
                    "Phasellus tincidunt posuere leo, ac dictum dolor. Sed nec nunc rutrum, mattis sem nec, bibendum nulla. Etiam rhoncus luctus nisl, eu maximus nisi pellentesque nec. Vestibulum in ex sodales, dignissim metus nec, auctor est. Nulla facilisi. Maecenas tristique metus vel porttitor commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\n" +
                    "\n" +
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et malesuada elit. Fusce id vulputate lectus, eu dignissim eros. Maecenas a urna quis purus interdum ullamcorper. Nunc in faucibus ipsum. Suspendisse bibendum venenatis venenatis. Suspendisse varius maximus purus facilisis congue. Duis vehicula dapibus metus et porta. Nulla egestas consequat molestie. Etiam tempor facilisis sapien vel efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In porttitor at risus quis pellentesque.\n" +
                    "\n" +
                    "Phasellus congue, arcu ut hendrerit vulputate, tellus tortor iaculis odio, vitae iaculis nisi ante non felis. Quisque in velit leo. Fusce vestibulum, nisl id gravida venenatis, lacus libero venenatis odio, sit amet hendrerit risus eros eu nisi. Ut tempor mattis odio et porta. Nullam mollis nisi magna, eget consequat augue ullamcorper eu. Vivamus vulputate, lorem nec tempus placerat, leo lorem maximus justo, eget bibendum massa elit ac orci. Sed et rutrum dolor, in blandit neque. Etiam vulputate porttitor orci, sit amet interdum turpis venenatis vehicula. Vivamus dignissim lacus non erat elementum, congue varius ante imperdiet. Phasellus dictum fermentum feugiat. Aenean enim mi, dapibus quis ligula non, hendrerit efficitur lorem. Maecenas sagittis sagittis lorem id finibus.</p>");
            f.setLastEdited(LocalDateTime.now());
            f.setCategory(actualCategories.get(5));
            f.setSubcategory(actualSubCats.get(5));
            this.articleRepository.save(f);

            Article g = new Article();
            g.setTitle("navigatie");
            g.setContent("<p>Dit is de navigatie matrix. <br><billy-matrix><p>");
            g.setLastEdited(LocalDateTime.now());
            g.setCategory(actualCategories.get(5));
            g.setSubcategory(actualSubCats.get(5));
            this.articleRepository.save(g);

            this.categoryRepository.findAll().forEach(category -> {
                if (category.getName().equals("Standaardpagina")) {
                    return;
                }
                String catName = category.getName().toLowerCase();
                Article article = new Article();
                article.setTitle(catName);
                article.setContent(String.format("<p>Welkom op de %s categorie pagina!<br>" +
                        "De volgende artikelen horen bij deze categorie:<br>" +
                        "<billy-categories></p>", catName));
                article.setCategory(category);
                article.setLastEdited(LocalDateTime.now());
                article.setSubcategory(actualSubCats.get(5));
                category.addArticle(article);
                this.articleRepository.save(article);
                this.categoryRepository.save(category);
            });
            this.subcategoryRepository.findAll().forEach(subcategory -> {
                if (subcategory.getName().equals("Standaardpagina")) {
                    return;
                }
                String catName = subcategory.getName().toLowerCase();
                Article article = new Article();
                article.setTitle(catName);
                article.setContent(String.format("<p>Welkom op de %s subcategorie pagina!<br>" +
                        "De volgende artikelen horen bij deze subcategorie:<br>" +
                        "<billy-categories></p>", catName));
                article.setSubcategory(subcategory);
                article.setLastEdited(LocalDateTime.now());
                article.setCategory(actualCategories.get(5));
                subcategory.addArticle(article);
                this.articleRepository.save(article);
                this.subcategoryRepository.save(subcategory);
            });
            this.categoryRepository.findAll().forEach(category -> {
                if (category.getName().equals("Standaardpagina")) {
                    return;
                }
                this.subcategoryRepository.findAll().forEach(subcategory -> {
                    if (subcategory.getName().equals("Standaardpagina")) {
                        return;
                    }
                    String articleName = String.format("%s %s", category.getName(), subcategory.getName());
                    String articleContent = String.format("<p>Welkom op de %s pagina! <br>" +
                            "De volgende artikelen hebben deze categorieën:<br>" +
                            "<billy-categories></p>", articleName);
                    Article article = new Article(articleName.toLowerCase(), articleContent, LocalDateTime.now(), category, subcategory);
                    this.articleRepository.save(article);
                    String secondArticleName = String.format("%s %s dummy", category.getName(), subcategory.getName());
                    String secondArticleContent = String.format("<p>Welkom op de %s pagina! </p>", articleName);
                    Article secondArticle = new Article(secondArticleName.toLowerCase(), secondArticleContent, LocalDateTime.now(), category, subcategory);
                    this.articleRepository.save(secondArticle);
                });
            });

        }
    }

    public ArrayList<ArticleDTO> getFromCat(String id) {
        if (!(id.equals("Standaardpagina"))) {
            Category c = this.categoryRepository.findAllByName(id);
            if (c != null) {
                ArrayList<ArticleDTO> articleDTOs = new ArrayList<>();
                c.getArticles().forEach(article -> articleDTOs.add(new ArticleDTO(article)));
                articleDTOs.sort(Comparator.comparing(ArticleDTO::getLastEdited));
                return articleDTOs;
            }
        }
        return null;
    }

    public List<CategoryDTO> getAllCategories(){
        List<CategoryDTO> categories = new ArrayList<>();
        categoryRepository.findAll().forEach(category -> {
            if (!category.getName().equals("Standaardpagina")) {
                categories.add(new CategoryDTO(category.getName()));
            }
        });
        return categories;
    }

    public List<SubcategoryDTO> getAllSubcategories(){
        List<SubcategoryDTO> subcategoryDTOS = new ArrayList<>();
        subcategoryRepository.findAll().forEach(subcategory -> {
            if (!subcategory.getName().equals("Standaardpagina")) {
                subcategoryDTOS.add(new SubcategoryDTO(subcategory.getName()));
            }
        });
        return subcategoryDTOS;
    }

    public ArrayList<ArticleDTO> getFromSubcat(String id) {
        if (!(id.equals("Standaardpagina"))) {
            Subcategory sc = this.subcategoryRepository.findAllByName(id);
            if (sc != null) {
                ArrayList<ArticleDTO> articleDTOs = new ArrayList<>();
                sc.getArticles().forEach(article -> articleDTOs.add(new ArticleDTO(article)));
                articleDTOs.sort(Comparator.comparing(ArticleDTO::getLastEdited));
                return articleDTOs;
            }
        }
        return null;
    }

    public ArticleDTO createArticle(ArticleCreateDTO acd) {
        if (this.getArticle(acd.getTitle()) == null) {
            Article a = new Article();
            a.setTitle(acd.getTitle().toLowerCase());
            a.setContent(acd.getContent());
            Category c = this.categoryRepository.findAllByName(acd.getCategoryDTO().getName());
            if (c != null) {
                a.setCategory(c);
                c.addArticle(a);
            }
            Subcategory sc = this.subcategoryRepository.findAllByName(acd.getSubcategoryDTO().getName());
            if (c != null) {
                a.setSubcategory(sc);
                sc.addArticle(a);
            }
            a.setLastEdited(LocalDateTime.now());
            this.articleRepository.save(a);
            this.categoryRepository.save(a.getCategory());
            this.subcategoryRepository.save(a.getSubcategory());
            return new ArticleDTO(a);
        } else return null;
    }

    public ArticleDTO updateArticle(String id, ArticleCreateDTO articleDTO) {
        Article article = this.articleRepository.findArticleByTitle(id);
        if (article != null) {
            int historyId = this.historyRepository.getId().orElse(0) + 1;
            History history = new History(historyId, article.getLastEdited(), article, article.getContent(),
                    article.getCategory(), article.getSubcategory());
            this.historyRepository.save(history);
            article.setContent(articleDTO.getContent());
            article.setLastEdited(LocalDateTime.now());
            Category prevCat = article.getCategory();
            if (!(prevCat.getName().equals(articleDTO.getCategoryDTO().getName()))) {
                Category newCat = this.categoryRepository.findAllByName(articleDTO.getCategoryDTO().getName());
                if (newCat != null) {
                    article.setCategory(newCat);
                    prevCat.removeArticle(article);
                    this.categoryRepository.save(prevCat);
                }
            }
            Subcategory prevSub = article.getSubcategory();
            if (!(prevSub.getName().equals(articleDTO.getSubcategoryDTO().getName()))) {
                Subcategory newCat = this.subcategoryRepository.findAllByName(articleDTO.getSubcategoryDTO().getName());
                if (newCat != null) {
                    article.setSubcategory(newCat);
                    prevSub.removeArticle(article);
                    this.categoryRepository.save(prevCat);
                }
            }
            this.articleRepository.save(article);
            this.categoryRepository.save(article.getCategory());
            this.subcategoryRepository.save(article.getSubcategory());
            return new ArticleDTO(article);
        } else return null;
    }

    public List<ArticleDTO> getFromCatAndSubcat(String id) {
        int limit = id.contains("interfacing") ? 3 : 2;
        String[] splittedId = id.split(" ", limit);
        if (splittedId.length < 2) {
            return null;
        } else {
            String catName = "";
            String subCatName = "";
            if (limit > 2) {
                catName = String.format("%s %s", splittedId[0], splittedId[1]);
                subCatName = splittedId[2].substring(0, 1).toUpperCase() + splittedId[2].substring(1);
            } else {
                catName = splittedId[0];
                subCatName = splittedId[1].substring(0, 1).toUpperCase() + splittedId[1].substring(1);
            }
            Category category = this.categoryRepository.findAllByName(catName);
            Subcategory subcategory = this.subcategoryRepository.findAllByName(subCatName);
            if (category != null && subcategory != null) {
                List<ArticleDTO> articleDTOS = new ArrayList<>();
                this.articleRepository.findAllByCategoryAndSubcategory(category, subcategory).forEach(article -> {
                    articleDTOS.add(new ArticleDTO(article));
                });
                return articleDTOS;
            } else return null;
        }
    }

    public List<HistoryDTO> getHistoryFromTitle(String title) {
        Article article = this.articleRepository.findArticleByTitle(title);
        if (article != null) {
            List<History> histories = this.historyRepository.findAllByArticle(article);
            if (histories != null) {
                histories.sort((item1, item2) -> item2.getEditDateTime().compareTo(item1.getEditDateTime()));
                return HistoryDTO.getFromList(histories);
            }
        }
        return null;
    }

    public ArticleDTO rollback(int id) {
        History history = this.historyRepository.findById(id);
        if (history != null) {
            Article article = history.getArticle();
            int newId = this.historyRepository.getId().orElse(0) + 1;
            History newHistory = new History(newId, article.getLastEdited(), article, article.getContent(),
                    article.getCategory(), article.getSubcategory());
            this.historyRepository.save(newHistory);
            article.setContent(history.getContent());
            article.setCategory(history.getCategory());
            article.setSubcategory(history.getSubcategory());
            article.setLastEdited(history.getEditDateTime());
            this.articleRepository.save(article);
            this.historyRepository.delete(history);
            return new ArticleDTO(article);
        } else return null;
    }
}
